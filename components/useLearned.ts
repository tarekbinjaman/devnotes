"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Per-browser "learned" progress, stored in localStorage (stays on this device only). */
const KEY = "devnotes:learned";
const EVENT = "devnotes:learned-change";
const EMPTY: string[] = [];

let cacheRaw: string | null = null;
let cacheList: string[] = EMPTY;

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cacheRaw) return cacheList; // stable reference for useSyncExternalStore
  cacheRaw = raw;
  try {
    const parsed = JSON.parse(raw ?? "[]");
    cacheList = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cacheList = EMPTY;
  }
  return cacheList;
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function useLearned() {
  const learned = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: progress just won't persist */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { learned, isLearned: (id: string) => learned.includes(id), toggle };
}
