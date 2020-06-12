import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT,
            price REAL
        )
    `);
});

export default db;