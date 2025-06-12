import { ApiProperty } from "@nestjs/swagger";

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
    @ApiProperty({
        description: "Description of the invoice line item",
        example: "Premium software license"
    })
    description: string;

    /**
     * Amount for this invoice line
     * @type {number}
     * @example 299.99
     */
    @ApiProperty({
        description: "Amount for this invoice line",
        example: 299.99
    })
    amount: number;
}
