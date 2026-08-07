import { Request, Response } from 'express';
import {
  getContactsByUserId,
  addContact,
  updateContact,
  deleteContact,
  createSOSEvent,
  updateSOSEvent,
  getSOSEventsByUserId,
  getActiveSOSEventByUserId,
  ContactNotificationResult
} from '../db/emergencyDb';
import {
  sendEmergencyAlertEmail,
  sendUserSOSConfirmationEmail,
  sendImSafeNotificationEmail
} from '../services/emailService';

export const emergencyController = {
  // GET /api/emergency/contacts
  getContacts: async (req: Request, res: Response) => {
    try {
      const userId = (req.query.userId as string) || (req as any).user?.id || 'usr_109283';
      const contacts = getContactsByUserId(userId);
      return res.status(200).json({
        success: true,
        contacts,
        total: contacts.length,
        maxAllowed: 5
      });
    } catch (error: any) {
      console.error('Error in getContacts:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch emergency contacts' });
    }
  },

  // POST /api/emergency/contacts
  addContact: async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId || (req as any).user?.id || 'usr_109283';
      const { name, relation, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone number are required.' });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const existingContacts = getContactsByUserId(userId);
      if (existingContacts.length >= 5) {
        return res.status(400).json({ error: 'Maximum limit of 5 emergency contacts reached. Delete an existing contact to add a new one.' });
      }

      const newContact = addContact(userId, {
        name: name.trim(),
        relation: (relation || 'Family/Friend').trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim()
      });

      return res.status(201).json({
        success: true,
        message: 'Emergency contact added successfully.',
        contact: newContact
      });
    } catch (error: any) {
      console.error('Error in addContact:', error);
      return res.status(400).json({ error: error.message || 'Failed to add emergency contact' });
    }
  },

  // PUT /api/emergency/contacts/:id
  updateContact: async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId || (req as any).user?.id || 'usr_109283';
      const { id } = req.params;
      const { name, relation, email, phone } = req.body;

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Please provide a valid email address.' });
        }
      }

      const updated = updateContact(userId, id, {
        ...(name && { name: name.trim() }),
        ...(relation && { relation: relation.trim() }),
        ...(email && { email: email.trim().toLowerCase() }),
        ...(phone && { phone: phone.trim() })
      });

      if (!updated) {
        return res.status(404).json({ error: 'Emergency contact not found.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Emergency contact updated successfully.',
        contact: updated
      });
    } catch (error: any) {
      console.error('Error in updateContact:', error);
      return res.status(500).json({ error: error.message || 'Failed to update emergency contact' });
    }
  },

  // DELETE /api/emergency/contacts/:id
  deleteContact: async (req: Request, res: Response) => {
    try {
      const userId = (req.query.userId as string) || req.body.userId || (req as any).user?.id || 'usr_109283';
      const { id } = req.params;

      const deleted = deleteContact(userId, id);
      if (!deleted) {
        return res.status(404).json({ error: 'Emergency contact not found or already deleted.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Emergency contact deleted successfully.'
      });
    } catch (error: any) {
      console.error('Error in deleteContact:', error);
      return res.status(500).json({ error: error.message || 'Failed to delete emergency contact' });
    }
  },

  // POST /api/emergency/trigger
  triggerSOS: async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId || (req as any).user?.id || 'usr_109283';
      const userName = req.body.userName || (req as any).user?.name || 'Security User';
      const userEmail = req.body.userEmail || (req as any).user?.email || 'milanrathod5201@gmail.com';
      const { customMessage, gpsLocation } = req.body;

      const now = new Date();
      const emergencyTime = now.toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'medium'
      });

      // Extract client metadata
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
      const deviceInfo = (req.headers['user-agent'] as string) || 'Browser/Mobile Device';

      // Generate Google Maps URL if GPS coordinates available
      let googleMapsUrl = '';
      if (gpsLocation && typeof gpsLocation.latitude === 'number' && typeof gpsLocation.longitude === 'number') {
        googleMapsUrl = `https://www.google.com/maps?q=${gpsLocation.latitude},${gpsLocation.longitude}`;
      } else {
        googleMapsUrl = `https://www.google.com/maps?q=20.5937,78.9629`; // Default center fallback
      }

      // Fetch user's emergency contacts
      const contacts = getContactsByUserId(userId);

      // Notify each contact with retry loop
      const contactsNotifiedResults: ContactNotificationResult[] = [];

      for (const contact of contacts) {
        const result = await sendEmergencyAlertEmail({
          to: contact.email,
          contactName: contact.name,
          userName,
          userEmail,
          emergencyTime,
          deviceInfo,
          ipAddress,
          gpsCoordinates: gpsLocation,
          googleMapsUrl,
          customMessage: customMessage || 'Immediate cyber threat or security compromise detected. Please respond or check on me.'
        }, 2); // 2 retries

        contactsNotifiedResults.push({
          contactId: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          status: result.success ? (result.attempts > 1 ? 'RETRIED_SENT' : 'SENT') : 'FAILED',
          attempts: result.attempts,
          error: result.error,
          sentAt: new Date().toISOString()
        });
      }

      // Notify the user as well with a confirmation email
      let userNotifStatus: 'SENT' | 'FAILED' = 'SENT';
      try {
        sendUserSOSConfirmationEmail(userEmail, userName, emergencyTime, googleMapsUrl);
      } catch (err) {
        console.error('Failed to send confirmation email to user:', err);
        userNotifStatus = 'FAILED';
      }

      // Save SOS Record in database
      const sosRecord = createSOSEvent({
        userId,
        userName,
        userEmail,
        status: 'ACTIVE',
        timestamp: now.toISOString(),
        message: customMessage || 'Immediate cyber threat or security compromise detected.',
        gpsLocation: gpsLocation || null,
        googleMapsUrl,
        ipAddress,
        deviceInfo,
        contactsNotified: contactsNotifiedResults,
        userNotificationStatus: userNotifStatus
      });

      return res.status(200).json({
        success: true,
        message: `SOS Emergency Alert successfully broadcasted to ${contacts.length} contact(s).`,
        sosEvent: sosRecord
      });
    } catch (error: any) {
      console.error('Error in triggerSOS:', error);
      return res.status(500).json({ error: error.message || 'Failed to process SOS emergency alert.' });
    }
  },

  // POST /api/emergency/resolve ("I'm Safe" endpoint)
  resolveSOS: async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId || (req as any).user?.id || 'usr_109283';
      const userName = req.body.userName || (req as any).user?.name || 'Security User';
      const { eventId } = req.body;

      const activeEvent = eventId 
        ? getSOSEventsByUserId(userId).find(e => e._id === eventId)
        : getActiveSOSEventByUserId(userId);

      if (!activeEvent) {
        return res.status(404).json({ error: 'No active SOS emergency event found to resolve.' });
      }

      const resolvedTime = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      });

      // Update event status in DB
      const updatedEvent = updateSOSEvent(activeEvent._id, {
        status: 'RESOLVED',
        resolvedAt: new Date().toISOString()
      });

      // Send "I'm Safe" resolution notifications to emergency contacts
      const contacts = getContactsByUserId(userId);
      for (const contact of contacts) {
        try {
          sendImSafeNotificationEmail(contact.email, contact.name, userName, resolvedTime);
        } catch (err) {
          console.error(`Error sending I'm Safe email to ${contact.email}:`, err);
        }
      }

      return res.status(200).json({
        success: true,
        message: "SOS event marked as RESOLVED. Emergency contacts have been notified that you are safe.",
        sosEvent: updatedEvent
      });
    } catch (error: any) {
      console.error('Error in resolveSOS:', error);
      return res.status(500).json({ error: error.message || "Failed to mark SOS as resolved." });
    }
  },

  // GET /api/emergency/history
  getHistory: async (req: Request, res: Response) => {
    try {
      const userId = (req.query.userId as string) || (req as any).user?.id || 'usr_109283';
      const events = getSOSEventsByUserId(userId);
      return res.status(200).json({
        success: true,
        events
      });
    } catch (error: any) {
      console.error('Error in getHistory:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch SOS emergency history.' });
    }
  }
};
