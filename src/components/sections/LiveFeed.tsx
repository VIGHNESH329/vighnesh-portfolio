'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { useEffect, useState, useRef } from 'react';

const cyberLogs = [
  "[SYS] Initializing threat detection matrix...",
  "[IDS] Anomaly detected on port 443",
  "[WARN] High traffic volume from IP 192.168.1.105",
  "[SEC] Executing automated containment protocol.",
  "[SIEM] Parsing Windows Event Logs...",
  "[OK] Node #401 secured.",
  "[INFO] Threat intelligence feed updated: +402 IOCs",
  "[SCAN] Vulnerability assessment running on endpoint-X",
  "[SYS] Memory integrity verified.",
  "[ALERT] Unauthorized access attempt blocked.",
  "[FORENSICS] Analyzing PCAP file chunk 7...",
  "[AUTH] Admin access granted to SOC Dashboard."
];

const sdeLogs = [
  "> npm run build",
  "Compiling optimized production build...",
  "Running type checks...",
  "Compiled successfully in 4.12s",
  "> docker-compose up -d",
  "Starting container database_1 ... done",
  "Starting container api_service_1 ... done",
  "[INFO] Server listening on port 8080",
  "Connected to SQLite database successfully.",
  "Executing DB migrations... OK.",
  "[TEST] Running unit tests: 142 passing, 0 failing.",
  "> git push origin main"
];

export default function LiveFeed() {
  const { activeIdentity } = useIdentityStore();
  const logs = activeIdentity === 'cyber' ? cyberLogs : sdeLogs;
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  useEffect(() => {
    setDisplayedLogs([]);
    const interval = setInterval(() => {
      setDisplayedLogs(prev => {
        const newLog = logs[Math.floor(Math.random() * logs.length)];
        const next = [...prev, newLog];
        if (next.length > 20) return next.slice(1);
        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div 
      className="absolute inset-0 z-0 opacity-[0.05] font-mono text-xs md:text-sm overflow-hidden flex flex-col justify-end p-8 pointer-events-none mix-blend-screen"
      style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)' }}
    >
      <div className="flex flex-col gap-2 h-full justify-end">
        {displayedLogs.map((log, i) => (
          <div key={i} className="text-primary">{log}</div>
        ))}
      </div>
    </div>
  );
}
