import { Logger } from "@nestjs/common";
import { writeFileSync, mkdirSync, existsSync, appendFileSync } from "fs";
import { join } from "path";
import { ConflictResponse } from "../dtos/api-responses/errors/conflict-error-response.dto";

/**
 * Utility class for interacting with a local JSON Lines (JSONL) file-based database.
 *
 * This is intended for lightweight persistence, such as storing logs or temporary data
 * in environments where a full database engine is unnecessary.
 */
export class JsonlDbUtils {
    // Directory where the .jsonl file will be stored
    private static readonly dbDir = join(__dirname, "..", "..", "..", "db");

    // Path to the actual JSONL file
    private static readonly dbPath = join(JsonlDbUtils.dbDir, "result.jsonl");

    /**
     * Ensures the database directory and file exist.
     * If not, it creates them.
     */
    private static ensureDb() {
        if (!existsSync(JsonlDbUtils.dbDir))
            mkdirSync(JsonlDbUtils.dbDir, { recursive: true });

        if (!existsSync(JsonlDbUtils.dbPath))
            appendFileSync(JsonlDbUtils.dbPath, "");
    }

    /**
     * Appends a new record to the JSONL file.
     *
     * The object must contain a "type" property to indicate the kind of record.
     *
     * @param data - The object to append. Must include a "type" field.
     * @throws ConflictResponse if "type" field is missing.
     */
    static append(data: Record<string, any>) {
        if (!data.type) {
            throw new ConflictResponse(
                'The object must include a "type" field (e.g., "vendor", "invoice").'
            );
        }

        JsonlDbUtils.ensureDb();

        const line = JSON.stringify(data);
        appendFileSync(JsonlDbUtils.dbPath, line + "\n", "utf-8");
    }
}
