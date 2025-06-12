import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
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
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    company: string;

    /**
     * Name of the vendor
     * @type {string}
     * @example "Tech Solutions Inc"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    vendorName: string;

    /**
     * Country where the vendor is located
     * @type {string}
     * @example "USA"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    country: string;

    /**
     * Primary bank of the vendor
     * @type {string}
     * @example "Chase Bank"
     * @validation Non-empty string required
     */
    @Expose()
    @IsString()
    @IsNotEmpty()
    bank: string;

    /**
     * Registration number of the vendor
     * @type {string}
     * @example "REG123456789"
     * @validation Optional string
     */
    @Expose()
    @IsString()
    @IsOptional()
    registrationNumber: string;

    /**
     * Tax identification number
     * @type {string}
     * @example "TAX987654321"
     * @validation Optional string
     */
    @Expose()
    @IsString()
    @IsOptional()
    taxId: string;
}
