/**
 * Output DTO for invoice line data
 * @class InvoiceLineOutputDto
 */
export class InvoiceLineOutputDto {
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
