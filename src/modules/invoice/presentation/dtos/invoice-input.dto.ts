import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { InvoiceLineInputDto } from "./invoice-line-input.dto";
import { Expose, Type } from "class-transformer";
import { BaseDto } from "src/shared/dtos/base/base.dto";

/**
 * Input DTO for invoice data with validation
 * @class InvoiceInputDto
 * @extends {BaseDto<InvoiceInputDto>}
 * @description Validates and transforms incoming invoice data from HTTP requests
 */
export class InvoiceInputDto extends BaseDto<InvoiceInputDto> {
    /**
     * Company identifier
     * @type {string}
     * @example "A"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    company: string;

    /**
     * Unique invoice identifier
     * @type {string}
     * @example "INV-2024-001"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    /**
     * Invoice date in string format
     * @type {string}
     * @example "2024-03-15"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    invoiceDate: string;

    /**
     * Array of invoice line items
     * @type {InvoiceLineInputDto[]}
     * @example [{ description: "Software license", amount: 299.99 }]
     * @validation Array with validated nested objects
     */
    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InvoiceLineInputDto)
    lines: InvoiceLineInputDto[];
}
