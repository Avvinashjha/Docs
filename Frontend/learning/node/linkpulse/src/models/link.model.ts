import pool from "../config/mysql";

import {v4 as uuidv4} from "uuid";

export interface Link {
    id: string;
    originalUrl: string;
    shortCode: string;
    userId?: string; // optional if we allow anonymous link
    createdAt: Date;
}

export const createLinkTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS links (
        id VARCHAR(36) PRIMARY KEY,
        original_url TEXT NOT NULL,
        short_code VARCHAR(10) UNIQUE NOT NULL,
        user_id VARCHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    await pool.execute(query);
}

export const saveLink = async (originalUrl: string, shortCode: string, userId?: string): Promise<Link> => {
    const id = uuidv4();
    const query = 'INSERT INTO links (id, original_url, short_code, user_id) VALUES (?,?,?,?';
    await pool.execute(query, [id, originalUrl, shortCode, userId || null]);
    return {id, originalUrl, shortCode, userId, createdAt: new Date()};
}  

export const getLinkByShortCode = async (shortCode: string): Promise<Link | null> => {
    const query = "SELECT * FROM links where short_code = ? LIMIT 1";
    const [rows] = await pool.execute(query, [shortCode]);
    const links = rows as any[];
    return links.length > 0 ? links[0] : null;
};