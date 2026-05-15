export const LEAD_STATUSES = [
  "nuevo",
  "contactado",
  "propuesta",
  "cerrado",
  "descartado",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  body: string;
  status: LeadStatus;
  notes: string;
};

export type LeadInput = Omit<Lead, "id" | "createdAt" | "status" | "notes">;

export const SERVICE_LABELS: Record<string, string> = {
  "meta-ads": "Meta Ads",
  contenido: "Creación de contenido",
  "redes-community": "Redes y community",
  estrategia: "Marketing estratégico",
  "no-seguro": "Aún no definido",
};

export const BUDGET_LABELS: Record<string, string> = {
  "": "—",
  explorando: "Explorando",
  bajo: "Hasta ~USD 500/mes",
  medio: "USD 500 – 2.000/mes",
  alto: "Más de USD 2.000/mes",
  definir: "Definir en llamada",
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  propuesta: "Propuesta enviada",
  cerrado: "Cerrado",
  descartado: "Descartado",
};
