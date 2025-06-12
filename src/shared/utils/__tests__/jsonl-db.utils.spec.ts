import * as fs from "fs";
import * as path from "path";
import { JsonlDbUtils } from "../jsonl-db.utils";
import { ConflictResponse } from "../../dtos/api-responses/errors/conflict-error-response.dto";

jest.mock("fs");

describe("JsonlDbUtils", () => {
    const mockedFs = fs as jest.Mocked<typeof fs>;
    const validData = { type: "vendor", id: 1, name: "Test Vendor" };
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "db",
        "result.jsonl"
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debería crear el directorio y archivo si no existen", () => {
        mockedFs.existsSync.mockImplementation((targetPath: string) => {
            if (targetPath.includes("db")) return false;
            return true;
        });

        JsonlDbUtils.append(validData);

        expect(mockedFs.mkdirSync).toHaveBeenCalledWith(
            expect.stringContaining("db"),
            { recursive: true }
        );
        expect(mockedFs.appendFileSync).toHaveBeenCalledWith(
            expect.any(String),
            ""
        ); // para crear archivo vacío
        expect(mockedFs.appendFileSync).toHaveBeenCalledWith(
            filePath,
            JSON.stringify(validData) + "\n",
            "utf-8"
        );
    });

    it('debería lanzar ConflictResponse si falta el campo "type"', () => {
        try {
            JsonlDbUtils.append({ id: 99 } as any);
        } catch (err) {
            expect(err).toBeInstanceOf(ConflictResponse);
            expect(err.message).toBe(
                'El objeto debe incluir el campo "type" (e.g., "vendor", "invoice")'
            );
        }
    });

    it("debería escribir el JSON en el archivo result.jsonl si ya existe", () => {
        mockedFs.existsSync.mockReturnValue(true);

        JsonlDbUtils.append(validData);
        expect(mockedFs.mkdirSync).not.toHaveBeenCalled();
        expect(mockedFs.appendFileSync).toHaveBeenCalledTimes(1);

        expect(mockedFs.appendFileSync).toHaveBeenCalledWith(
            filePath,
            JSON.stringify(validData) + "\n",
            "utf-8"
        );
    });
});
