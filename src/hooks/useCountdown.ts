"use client";

import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function compute(target: number): CountdownValue {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

/** Returns null until mounted so server and client markup always match. */
export function useCountdown(targetIso: string) {
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    setValue(compute(target));
    const id = window.setInterval(() => setValue(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return value;
}
