import { Logger } from "@nestjs/common";
import { writeFileSync, mkdirSync, existsSync, appendFileSync } from "fs";
import { join } from "path";
import { ConflictResponse } from "../dtos/api-responses/errors/conflict-error-response.dto";

export class JsonlDbUtils {
    private static readonly dbDir = join(__dirname, "..", "..", "..", "db");
    private static readonly dbPath = join(JsonlDbUtils.dbDir, "result.jsonl");

    private static ensureDb() {
        if (!existsSync(JsonlDbUtils.dbDir))
            mkdirSync(JsonlDbUtils.dbDir, { recursive: true });

        if (!existsSync(JsonlDbUtils.dbPath))
            appendFileSync(JsonlDbUtils.dbPath, "");
    }

    static append(data: Record<string, any>) {
        if (!data.type) {
            throw new ConflictResponse(
                'El objeto debe incluir el campo "type" (e.g., "vendor", "invoice")'
            );
        }

        JsonlDbUtils.ensureDb();

        const line = JSON.stringify(data);
        appendFileSync(JsonlDbUtils.dbPath, line + "\n", "utf-8");
    }
}
