import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const ssl = process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined;

export const pool = new Pool({ connectionString, ssl });

export async function assertDbConnection() {
  const { rows } = await pool.query("SELECT 1 AS ok");
  if (!rows?.[0]?.ok) throw new Error("DB connection failed");
}
