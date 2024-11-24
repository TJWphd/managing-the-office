import { pool } from "./connection.js";

export default class empDB {
  constructor() {}

  async query(sql: string, args: any[] = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } catch (error) {
      console.error("database query error:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}

// TODO: create queries as functions here
