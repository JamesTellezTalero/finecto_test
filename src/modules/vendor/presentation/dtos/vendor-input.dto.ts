import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseDto } from "src/shared/dtos/base/base.dto";

/**
 * Input DTO for vendor data with validation
 * @class VendorInputDto
 * @extends {BaseDto<VendorInputDto>}
 * @description Validates and transforms incoming vendor data from HTTP requests
 */
export class VendorInputDto extends BaseDto<VendorInputDto> {
    /**
     * Company identifier
     * @type {string}
     * @example "COMPANY_A"
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Company identifier",
        example: "COMPANY_A"
    })
    company: string;

    /**
     * Name of the vendor
     * @type {string}
     * @example "Tech Solutions Inc"
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Name of the vendor",
        example: "Tech Solutions Inc"
    })
    vendorName: string;

    /**
     * Country where the vendor is located
     * @type {string}
     * @example "USA"
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Country where the vendor is located",
        example: "USA"
    })
    country: string;

    /**
     * Primary bank of the vendor
     * @type {string}
     * @example "Chase Bank"
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Primary bank of the vendor",
        example: "Chase Bank"
    })
    bank: string;

    /**
     * Registration number of the vendor
     * @type {string}
     * @example "REG123456789"
     */
    @Expose()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Registration number of the vendor",
        example: "REG123456789"
    })
    registrationNumber: string;

    /**
     * Tax identification number
     * @type {string}
     * @example "TAX987654321"
     */
    @Expose()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Tax identification number",
        example: "TAX987654321"
    })
    taxId: string;
}
