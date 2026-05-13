-- SQL schema for attendees table
CREATE TABLE attendees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  tel TEXT,
  institution TEXT,
  position TEXT,
  form_type TEXT NOT NULL DEFAULT 'attendee',
  payload TEXT,  -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SQL schema for school registrations
CREATE TABLE schools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  school_name TEXT NOT NULL,
  students INTEGER NOT NULL,
  staff INTEGER NOT NULL,
  address TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  payload TEXT,  -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);