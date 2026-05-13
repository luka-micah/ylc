-- SQL schema for attendees table
CREATE TABLE attendees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  tel TEXT,
  form_type TEXT NOT NULL,
  payload TEXT,  -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);