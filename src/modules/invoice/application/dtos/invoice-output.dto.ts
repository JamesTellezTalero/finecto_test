import { InvoiceLineOutputDto } from "./invoice-line-output.dto";

/**
 * Output DTO for invoice data
 * @class InvoiceOutputDto
 */
export class InvoiceOutputDto {
    /**
     * Account identifier
     * @type {string}
     * @example "ACC-12345"
     */
    account: string;

    /**
     * Invoice date in string format
     * @type {string}
     * @example "2024-03-15"
     */
    invoiceDate: string;

    /**
     * Unique invoice identifier
     * @type {string}
     * @example "INV-2024-001"
     */
    invoiceId: string;

    /**
     * Array of invoice line items
     * @type {InvoiceLineOutputDto[]}
     * @example [{ description: "Software license", amount: 299.99 }]
     */
    lines: InvoiceLineOutputDto[];

    /**
     * Creates an instance of InvoiceOutputDto
     * @param {string} account - Account identifier
     * @param {string} invoiceId - Unique invoice identifier
     * @param {string} invoiceDate - Invoice date in string format
     * @param {InvoiceLineOutputDto[]} lines - Array of invoice line items
     */
    constructor(
        account: string,
        invoiceId: string,
        invoiceDate: string,
        lines: InvoiceLineOutputDto[]
    ) {
        this.account = account;
        this.invoiceId = invoiceId;
        this.invoiceDate = invoiceDate;
        this.lines = lines;
    }
}
