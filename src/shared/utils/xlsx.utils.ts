import * as ExcelJS from "exceljs";

/**
 * Utilidades para la generación y manipulación de archivos XLSX.
 */
export class XlsxUtils {
    /**
     * Genera un archivo XLSX en memoria a partir de un arreglo de objetos y retorna un buffer.
     *
     * Cada objeto del arreglo representa una fila, y sus claves son las columnas.
     * Se crea una hoja llamada "TransfersInfo" donde se insertan los datos.
     *
     * @param input - Arreglo de objetos con los datos para las filas del Excel.
     * @returns Un `Buffer` con el contenido del archivo XLSX generado.
     *
     * @example
     * const data = [
     *   { id: 1, name: "Juan", amount: 100 },
     *   { id: 2, name: "Ana", amount: 150 }
     * ];
     * const buffer = await XlsxUtils.genXlsxAndGetBuffer(data);
     */
    static async genXlsxAndGetBuffer(input: any[]): Promise<ArrayBuffer> {
        const workbook = new ExcelJS.Workbook();

        // Genera hoja TransfersInfo
        const transfersInfoSheet = workbook.addWorksheet("TransfersInfo");
        if (input.length > 0) {
            const headers = Object.keys(input[0]);
            transfersInfoSheet.addRow(headers);
            for (const row of input) {
                transfersInfoSheet.addRow(headers.map((h) => row[h]));
            }
        }
        return await workbook.xlsx.writeBuffer();
    }

    static async AddTranInfoAndGetBuffer(
        input: any[],
        workbook: ExcelJS.Workbook
    ): Promise<ArrayBuffer> {
        // Genera hoja TransfersInfo
        if (input.length > 0) {
            for (const row of input) {
                workbook.worksheets[0].addRow(input.map((h) => row[h]));
            }
        }
        return await workbook.xlsx.writeBuffer();
    }

    static async genXlsxWorksheedAndHeader(
        input: any[]
    ): Promise<ExcelJS.Workbook> {
        const workbook = new ExcelJS.Workbook();

        // Genera hoja TransfersInfo
        const transfersInfoSheet = workbook.addWorksheet("TransfersInfo");
        if (input.length > 0) {
            const headers = Object.keys(input[0]);
            transfersInfoSheet.addRow(headers);
        }
        return workbook;
    }
}
