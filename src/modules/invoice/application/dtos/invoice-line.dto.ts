/**
 * Input DTO for invoice line data
 * @class InvoiceLineDto
 */
export class InvoiceLineDto {
    /**
     * Description of the invoice line item
     * @type {string}
     * @example "Premium software license"
     */
    description: string;

    /**
     * Amount for this invoice line
     * @type {number}
     * @example 299.99
     */
    amount: number;
}
