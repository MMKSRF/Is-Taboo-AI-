CREATE DATABASE taboo_chat_db;


CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    message JSONB NOT NULL
);

CREATE INDEX idx_chat_history_session_id ON chat_history(session_id);