import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

const FILES = {
  instagram: path.join(DATA_DIR, 'instagram-feeds.json'),
  messages: path.join(DATA_DIR, 'messages.json'),
  doctors: path.join(DATA_DIR, 'doctors.json'),
};

const DATA_PROVIDER = (process.env.DATA_PROVIDER || '').toLowerCase();

function isMysqlConfigured() {
  return Boolean(
    process.env.MYSQL_HOST &&
    process.env.MYSQL_USER &&
    process.env.MYSQL_DATABASE,
  );
}

function shouldUseMysql() {
  if (DATA_PROVIDER === 'mysql') return true;
  if (DATA_PROVIDER === 'file') return false;
  return isMysqlConfigured();
}

async function getMysqlPool() {
  const mysqlModule = await new Function('moduleName', 'return import(moduleName)')('mysql2/promise');
  const mysql = mysqlModule.default || mysqlModule;

  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

async function ensureMysqlSchema(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS instagram_feeds (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      href TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(180) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS doctors (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      specialization VARCHAR(180) NOT NULL,
      experience INT DEFAULT 0,
      education TEXT,
      schedule_json LONGTEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

async function readCollectionFromMysql(key) {
  const pool = await getMysqlPool();
  await ensureMysqlSchema(pool);

  if (key === 'instagram') {
    const [rows] = await pool.query(
      'SELECT id, title, href, thumbnail FROM instagram_feeds ORDER BY created_at DESC',
    );
    return rows;
  }

  if (key === 'messages') {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, message, created_at FROM messages ORDER BY created_at DESC',
    );
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    }));
  }

  if (key === 'doctors') {
    const [rows] = await pool.query(
      'SELECT id, name, specialization, experience, education, schedule_json FROM doctors ORDER BY created_at DESC',
    );

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      specialization: row.specialization,
      experience: Number(row.experience || 0),
      education: row.education || '',
      schedule: row.schedule_json ? JSON.parse(row.schedule_json) : [],
    }));
  }

  return [];
}

async function writeCollectionToMysql(key, data) {
  const pool = await getMysqlPool();
  await ensureMysqlSchema(pool);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (key === 'instagram') {
      await connection.query('DELETE FROM instagram_feeds');
      for (const item of data) {
        await connection.query(
          'INSERT INTO instagram_feeds (id, title, href, thumbnail) VALUES (?, ?, ?, ?)',
          [item.id, item.title, item.href, item.thumbnail || ''],
        );
      }
    }

    if (key === 'messages') {
      await connection.query('DELETE FROM messages');
      for (const item of data) {
        await connection.query(
          'INSERT INTO messages (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [item.id, item.name, item.email, item.phone, item.message, item.createdAt || new Date()],
        );
      }
    }

    if (key === 'doctors') {
      await connection.query('DELETE FROM doctors');
      for (const item of data) {
        await connection.query(
          'INSERT INTO doctors (id, name, specialization, experience, education, schedule_json) VALUES (?, ?, ?, ?, ?, ?)',
          [
            item.id,
            item.name,
            item.specialization,
            Number(item.experience || 0),
            item.education || '',
            JSON.stringify(Array.isArray(item.schedule) ? item.schedule : []),
          ],
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

async function readCollectionFromFile(key) {
  const filePath = FILES[key];
  await ensureFile(filePath);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw || '[]');
}

async function writeCollectionToFile(key, data) {
  const filePath = FILES[key];
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readCollection(key) {
  if (shouldUseMysql()) {
    try {
      return await readCollectionFromMysql(key);
    } catch (error) {
      console.warn('[dataStore] MySQL read failed, fallback ke file JSON:', error?.message || error);
    }
  }

  return readCollectionFromFile(key);
}

export async function writeCollection(key, data) {
  if (shouldUseMysql()) {
    try {
      await writeCollectionToMysql(key, data);
      return;
    } catch (error) {
      console.warn('[dataStore] MySQL write failed, fallback ke file JSON:', error?.message || error);
    }
  }

  await writeCollectionToFile(key, data);
}

export function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}