import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

/**
 * Input DTO for invoice line item with validation
 * @class InvoiceLineInputDto
 * @description Validates individual line items within an invoice
 */
export class InvoiceLineInputDto {
    /**
     * Description of the invoice line item
     * @type {string}
     * @example "Premium software license"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    description: string;

    /**
     * Amount for this invoice line
     * @type {number}
     * @example 299.99
     * @validation Positive number required
     */
    @Expose()
    @IsNumber()
    @IsPositive()
    amount: number;
}
