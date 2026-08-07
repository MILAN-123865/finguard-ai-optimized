import { Router } from 'express';
import { emergencyController } from '../controllers/emergencyController';

const router = Router();

// Contacts Management
router.get('/contacts', emergencyController.getContacts);
router.post('/contacts', emergencyController.addContact);
router.put('/contacts/:id', emergencyController.updateContact);
router.delete('/contacts/:id', emergencyController.deleteContact);

// SOS Triggers & Resolution
router.post('/trigger', emergencyController.triggerSOS);
router.post('/resolve', emergencyController.resolveSOS);
router.get('/history', emergencyController.getHistory);

export default router;
