import { pool } from "../config/database";
import { randomBase62 } from "../utils/hashCode";

export class UrlService {
  static async shortUrl(actual_url: string) {
    while (true) {
      const code = randomBase62(6);

      try {
        await pool.execute(
          `INSERT INTO url_mapping (hash_id, actual_url, expiration_date, creating_date)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 DAY), NOW())`,
          [code, actual_url]
        );

        return code;
      } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") continue;
        throw err;
      }
    }
  }

  static async getActualUrl(code: string) {
    try {
      const [rows] = await pool.execute(
        "SELECT actual_url FROM url_mapping WHERE hash_id = ?",
        [code]
      );

      const result = (rows as any)[0];
      return result ? result.actual_url : null;
    } catch (error) {
      console.error("Error while fetching actual url:", error);
      throw error;
    }
  }
}
