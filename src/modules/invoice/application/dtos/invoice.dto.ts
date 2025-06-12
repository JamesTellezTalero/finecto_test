import { InvoiceLineDto } from "./invoice-line.dto";

/**
 * Input DTO for invoice data
 * @class InvoiceDto
 */
export class InvoiceDto {
    /**
     * Company name or identifier
     * @type {string}
     * @example "Acme Corporation"
     */
    company: string;

    /**
     * Unique invoice identifier
     * @type {string}
     * @example "INV-2024-001"
     */
    invoiceId: string;

    /**
     * Invoice date in string format
     * @type {string}
     * @example "2024-03-15"
     */
    invoiceDate: string;

    /**
     * Array of invoice line items
     * @type {InvoiceLineDto[]}
     * @example [{ description: "Software license", amount: 299.99 }]
     */
    lines: InvoiceLineDto[];
}
