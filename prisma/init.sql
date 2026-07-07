CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS "Company" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  "profileImage" TEXT NOT NULL,
  cif TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  website TEXT NOT NULL,
  "createAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updateAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Contact" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "companyId" TEXT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  "createAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updateAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_contact_company FOREIGN KEY ("companyId") REFERENCES "Company"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_contact_company_id ON "Contact"("companyId");

CREATE TABLE IF NOT EXISTS "Event" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "companyId" TEXT NOT NULL,
  title TEXT NOT NULL,
  "start" TIMESTAMPTZ NOT NULL,
  "allDay" BOOLEAN NOT NULL,
  "timeFormat" TEXT NOT NULL,
  "createAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updateAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_event_company FOREIGN KEY ("companyId") REFERENCES "Company"(id)
);

CREATE INDEX IF NOT EXISTS idx_event_company_id ON "Event"("companyId");

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updateAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_company_timestamp') THEN
    CREATE TRIGGER update_company_timestamp
      BEFORE UPDATE ON "Company"
      FOR EACH ROW EXECUTE FUNCTION update_timestamp();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_contact_timestamp') THEN
    CREATE TRIGGER update_contact_timestamp
      BEFORE UPDATE ON "Contact"
      FOR EACH ROW EXECUTE FUNCTION update_timestamp();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_timestamp') THEN
    CREATE TRIGGER update_event_timestamp
      BEFORE UPDATE ON "Event"
      FOR EACH ROW EXECUTE FUNCTION update_timestamp();
  END IF;
END;
$$;
