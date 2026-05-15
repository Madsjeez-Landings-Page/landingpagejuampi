import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { get, put } from "@vercel/blob";
import type { Lead, LeadInput, LeadStatus } from "./leads-types";

const BLOB_PATHNAME = "formula-leads/leads.json";
const LOCAL_FILE = path.join(process.cwd(), "data", "leads.json");

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readAll(): Promise<Lead[]> {
  if (useBlob()) {
    try {
      const result = await get(BLOB_PATHNAME, {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      if (!result || result.statusCode !== 200 || !result.stream) return [];
      const raw = await new Response(result.stream).text();
      const data = JSON.parse(raw) as unknown;
      return Array.isArray(data) ? (data as Lead[]) : [];
    } catch {
      return [];
    }
  }

  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? (data as Lead[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  const json = JSON.stringify(leads, null, 2);

  if (useBlob()) {
    await put(BLOB_PATHNAME, json, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return;
  }

  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, json, "utf8");
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
