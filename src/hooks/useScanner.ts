import { useState } from "react";
import { ScanResult, ScanType } from "../types";
import { scanService } from "../services/scanService";
import { recentScansService } from "../services/recentScansService";

export function useScanner() {
  const [currentTab, setCurrentTab] = useState<ScanType>("sms");
  const [inputContent, setInputContent] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStageIndex, setScanStageIndex] = useState<number>(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const scanStages = [
    {
      text: "Receiving Message",
      sub: "Establishing secure ingestion buffer...",
      prog: 1,
    },
    {
      text: "Keyword Detection",
      sub: "Running semantic vulnerability mapping...",
      prog: 2,
    },
    {
      text: "Gemini AI Analysis",
      sub: "Cross-referencing global threat databases...",
      prog: 3,
    },
    {
      text: "Risk Scoring",
      sub: "Finalizing probabilistic threat vectors...",
      prog: 4,
    },
  ];

  const runScan = async (overrideContent?: string) => {
    const textToScan = overrideContent || inputContent;
    if (!textToScan.trim()) return;

    setIsScanning(true);
    setScanResult(null);
    setScanStageIndex(0);

    for (let i = 0; i < scanStages.length; i++) {
      setScanStageIndex(i);
      await new Promise((r) => setTimeout(r, 400));
    }

    try {
      const result = await scanService.scanContent(currentTab, textToScan);
      console.log("RESULT BEFORE SET:", result);
      alert("Scan Completed");
      setScanResult(result);
      recentScansService.addRecentScan(result);
    } catch (err) {
      console.error("useScanner scan execution error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const loadRecentScan = (scan: ScanResult) => {
    if (
      scan.type &&
      ["sms", "email", "whatsapp", "url", "image", "qr", "voice"].includes(
        String(scan.type).toLowerCase(),
      )
    ) {
      setCurrentTab(String(scan.type).toLowerCase() as ScanType);
    }
    setInputContent(scan.content);
    setScanResult(scan);
  };

  const resetScanner = () => {
    setInputContent("");
    setScanResult(null);
    setIsScanning(false);
    setScanStageIndex(0);
  };

  return {
    currentTab,
    setCurrentTab,
    inputContent,
    setInputContent,
    isScanning,
    scanStageIndex,
    scanStages,
    scanResult,
    runScan,
    loadRecentScan,
    resetScanner,
  };
}
