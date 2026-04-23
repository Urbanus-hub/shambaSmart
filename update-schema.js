const fs = require('fs');

fs.writeFileSync('backend/sql/schema.sql', `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'AGENT')),
  employee_id TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fields Table
CREATE TABLE IF NOT EXISTS fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  crop_type TEXT NOT NULL,
  planting_date DATE NOT NULL,
  growth_duration_days INTEGER NOT NULL,
  expected_harvest_date DATE GENERATED ALWAYS AS (planting_date + growth_duration_days) STORED,
  stage TEXT NOT NULL CHECK (stage IN ('PLANTED', 'GROWING', 'READY', 'HARVESTED')),
  assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Field Updates Table
CREATE TABLE IF NOT EXISTS field_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field_id UUID NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("Written schema");

fs.writeFileSync('backend/src/types/models.ts', `
export type UserRole = "ADMIN" | "AGENT";
export type FieldStage = "PLANTED" | "GROWING" | "READY" | "HARVESTED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employee_id?: string;
  created_at?: string;
  password?: string;
}

export interface Field {
  id: string;
  name: string;
  crop_type: string;
  planting_date: string;
  growth_duration_days: number;
  expected_harvest_date: string;
  stage: FieldStage;
  assigned_agent_id: string | null;
  created_at?: string;
}

export interface FieldUpdate {
  id: string;
  field_id: string;
  agent_id: string;
  note: string;
  created_at: string;
}
`);

console.log("Written backend models");

fs.writeFileSync('frontend/src/types/index.ts', `
export type UserRole = "ADMIN" | "AGENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employee_id?: string;
  created_at?: string;
}

export type FieldStage = "PLANTED" | "GROWING" | "READY" | "HARVESTED";
export type FieldStatus = "Completed" | "At Risk" | "Active";

export interface Field {
  id: string;
  name: string;
  crop_type: string;
  planting_date: string;
  growth_duration_days: number;
  expected_harvest_date: string;
  stage: FieldStage;
  assigned_agent_id: string | null;
  status?: FieldStatus;
  image_url?: string;
  created_at?: string;
}

export interface FieldUpdate {
  id: string;
  field_id: string;
  agent_id: string;
  note: string;
  created_at: string;
}
`);

console.log("Written frontend types");

fs.mkdirSync('frontend/public', {recursive: true});
fs.writeFileSync('frontend/public/og-image.svg', `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfdf5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGradient)" />
  <text x="600" y="300" font-family="sans-serif" font-weight="bold" font-size="64" fill="#047857" text-anchor="middle">SmartSeason Field Monitoring</text>
  <text x="600" y="380" font-family="sans-serif" font-size="32" fill="#064e3b" text-anchor="middle">Track crop growth and field performance</text>
</svg>
`);

console.log("Written OG image");
