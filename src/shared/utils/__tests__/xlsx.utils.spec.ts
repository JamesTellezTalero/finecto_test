import * as ExcelJS from "exceljs";
import { XlsxUtils } from "../xlsx.utils";

describe("XlsxUtils.genXlsxAndGetBuffer", () => {
    it("debe retornar un Buffer", async () => {
        const data = [{ id: 1, name: "Juan", amount: 100 }];
        const buffer = await XlsxUtils.genXlsxAndGetBuffer(data);

        expect(buffer).toBeInstanceOf(Buffer);
    });

    it("debe generar una hoja llamada 'TransfersInfo'", async () => {
        const data = [{ id: 1, name: "Juan", amount: 100 }];
        const buffer = await XlsxUtils.genXlsxAndGetBuffer(data);
        expect(buffer).toBeDefined();
    });

    it("debe contener encabezados y filas con los datos correspondientes", async () => {
        const data = [
            { id: 1, name: "Juan", amount: 100 },
            { id: 2, name: "Ana", amount: 150 }
        ];

        const buffer = await XlsxUtils.genXlsxAndGetBuffer(data);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const sheet = workbook.getWorksheet("TransfersInfo");

        // Fila 1: headers
        const headerRow = sheet.getRow(1).values;
        expect(headerRow).toEqual([, "id", "name", "amount"]); // [ , ... ] porque index 0 es null en ExcelJS

        // Fila 2: primera fila de datos
        const row2 = sheet.getRow(2).values;
        expect(row2).toEqual([, 1, "Juan", 100]);

        // Fila 3: segunda fila de datos
        const row3 = sheet.getRow(3).values;
        expect(row3).toEqual([, 2, "Ana", 150]);
    });

    it("debe generar un archivo válido incluso si el arreglo está vacío", async () => {
        const buffer = await XlsxUtils.genXlsxAndGetBuffer([]);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const sheet = workbook.getWorksheet("TransfersInfo");
        expect(sheet).toBeDefined();
        expect(sheet.rowCount).toBe(0);
    });
});
