import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Lead, LeadInput, LeadStatus } from "./leads-types";

/** Local: data/leads.json · Railway: montá un volumen en /data y usá LEADS_DATA_FILE=/data/leads.json */
function leadsFilePath(): string {
  const custom = process.env.LEADS_DATA_FILE?.trim();
  if (custom) return path.isAbsolute(custom) ? custom : path.join(process.cwd(), custom);
  return path.join(process.cwd(), "data", "leads.json");
}

async function readAll(): Promise<Lead[]> {
  const file = leadsFilePath();
  try {
    const raw = await readFile(file, "utf8");
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? (data as Lead[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  const file = leadsFilePath();
  const json = JSON.stringify(leads, null, 2);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, json, "utf8");
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readAll();
  return leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "nuevo",
    notes: "",
    ...input,
  };

  const leads = await readAll();
  leads.unshift(lead);
  await writeAll(leads);
  return lead;
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<Lead, "status" | "notes">>,
): Promise<Lead | null> {
  const leads = await readAll();
  const i = leads.findIndex((l) => l.id === id);
  if (i === -1) return null;

  if (patch.status !== undefined) {
    leads[i].status = patch.status as LeadStatus;
  }
  if (patch.notes !== undefined) {
    leads[i].notes = patch.notes;
  }

  await writeAll(leads);
  return leads[i];
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await readAll();
  const next = leads.filter((l) => l.id !== id);
  if (next.length === leads.length) return false;
  await writeAll(next);
  return true;
}
