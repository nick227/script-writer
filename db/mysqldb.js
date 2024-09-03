import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor() {
        this.config = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        };
        this.connection = null;
        this.tableSchemas = {};
        this.initialize();
    }

    async initialize() {
        try {
            this.connection = await mysql.createConnection(this.config);
            console.log('Connected to MySQL database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    defineTable(tableName, schema) {
        this.tableSchemas[tableName] = schema;
    }

    async ensureTable(tableName) {
        if (!this.tableSchemas[tableName]) {
            throw new Error(`Schema for table ${tableName} is not defined`);
        }

        const schema = this.tableSchemas[tableName];
        const columns = Object.entries(schema).map(([name, type]) => `${name} ${type}`).join(', ');

        const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
        
        try {
            await this.connection.execute(query);
            console.log(`Ensured table ${tableName} exists`);
        } catch (error) {
            console.error(`Error creating table ${tableName}:`, error);
            throw error;
        }
    }

    async find(tableName, conditions = {}) {
        await this.ensureTable(tableName);
        const [rows] = await this.connection.execute(
            `SELECT * FROM ${tableName} WHERE ?`,
            [conditions]
        );
        return rows;
    }

    async findOne(tableName, conditions = {}) {
        await this.ensureTable(tableName);
        const [rows] = await this.connection.execute(
            `SELECT * FROM ${tableName} WHERE ? LIMIT 1`,
            [conditions]
        );
        return rows[0] || null;
    }

    async insert(tableName, doc) {
        await this.ensureTable(tableName);
        const [result] = await this.connection.execute(
            `INSERT INTO ${tableName} SET ?`,
            [doc]
        );
        return { ...doc, id: result.insertId };
    }

    async update(tableName, conditions, update) {
        await this.ensureTable(tableName);
        const [result] = await this.connection.execute(
            `UPDATE ${tableName} SET ? WHERE ?`,
            [update, conditions]
        );
        return result.affectedRows;
    }

    async remove(tableName, conditions) {
        await this.ensureTable(tableName);
        const [result] = await this.connection.execute(
            `DELETE FROM ${tableName} WHERE ?`,
            [conditions]
        );
        return result.affectedRows;
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
            console.log('Database connection closed');
        }
    }
}

export default Database;