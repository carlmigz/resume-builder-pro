import { useEffect, useState } from "react";

export type Experience = {
  id: string; role: string; company: string; start: string; end: string; description: string;
};
export type Education = {
  id: string; school: string; degree: string; start: string; end: string;
};
export type Certificate = {
  id: string; name: string; issuer: string; year: string;
};

export type ResumeData = {
  photo: string | null;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  objective: string;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  certificates: Certificate[];
  updatedAt: number;
};

export type ExportRecord = {
  id: string;
  name: string;
  format: "PDF";
  size: string;
  createdAt: number;
};

const KEY = "resumely.resume";
const HIST_KEY = "resumely.exports";

export const uid = () => Math.random().toString(36).slice(2, 9);

const defaults = (): ResumeData => ({
  photo: null,
  fullName: "",
  title: "Senior Product Designer",
  email: "",
  phone: "",
  location: "",
  website: "",
  objective:
    "Product designer with 6+ years crafting human-centered digital experiences.",
  experiences: [
    { id: uid(), role: "Senior Product Designer", company: "Northwind", start: "2022", end: "Present", description: "Led design system adoption across 4 product teams." },
  ],
  educations: [
    { id: uid(), school: "UC Berkeley", degree: "B.A. Design", start: "2014", end: "2018" },
  ],
  skills: ["Figma", "Design systems", "Prototyping", "User research"],
  certificates: [
    { id: uid(), name: "NN/g UX Certified", issuer: "Nielsen Norman Group", year: "2023" },
  ],
  updatedAt: Date.now(),
});

const listeners = new Set<() => void>();

function read(): ResumeData {
  if (typeof window === "undefined") return defaults();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaults();
    return { ...defaults(), ...(JSON.parse(raw) as ResumeData) };
  } catch {
    return defaults();
  }
}

function write(data: ResumeData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
  listeners.forEach((l) => l());
}

export const resumeStore = {
  get: read,
  set: (data: ResumeData) => write({ ...data, updatedAt: Date.now() }),
};

export function useResume(): [ResumeData, (patch: Partial<ResumeData>) => void] {
  const [data, setData] = useState<ResumeData>(() => read());
  useEffect(() => {
    const l = () => setData(read());
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  const update = (patch: Partial<ResumeData>) => {
    const next = { ...read(), ...patch, updatedAt: Date.now() };
    write(next);
  };
  return [data, update];
}

/* Export history */
function readExports(): ExportRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(HIST_KEY) || "[]");
  } catch { return []; }
}

export const exports_ = {
  list: readExports,
  add: (rec: Omit<ExportRecord, "id" | "createdAt">) => {
    if (typeof window === "undefined") return;
    const list = [{ ...rec, id: uid(), createdAt: Date.now() }, ...readExports()].slice(0, 50);
    window.localStorage.setItem(HIST_KEY, JSON.stringify(list));
  },
  clear: () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(HIST_KEY);
  },
};
