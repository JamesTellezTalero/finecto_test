import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { InvoiceLineInputDto } from "./invoice-line-input.dto";
import { Expose, Type } from "class-transformer";
import { BaseDto } from "src/shared/dtos/base/base.dto";
import { ApiProperty } from "@nestjs/swagger";

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
    @ApiProperty({
        description: "Company identifier",
        example: "A"
    })
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
    @ApiProperty({
        description: "Unique invoice identifier",
        example: "INV-2024-001"
    })
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
    @ApiProperty({
        description: "Invoice date in string format",
        example: "2024-03-15"
    })
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
    @ApiProperty({
        description: "Array of invoice line items",
        type: [InvoiceLineInputDto],
        example: [
            {
                description: "Software license",
                amount: 299.99
            },
            {
                description: "Software license - alcohol",
                amount: 299.99
            }
        ]
    })
    lines: InvoiceLineInputDto[];
}
