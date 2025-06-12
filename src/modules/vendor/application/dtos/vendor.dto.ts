import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * DTO for vendor data transfer
 * @class VendorDto
 * @description Basic vendor information for internal data transfer
 */
export class VendorDto {
    /**
     * Company identifier
     * @type {string}
     * @example "COMPANY_A"
     */
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
    @ApiProperty({
        description: "Primary bank of the vendor",
        example: "Chase Bank"
    })
    bank: string;

    /**
     * Registration number of the vendor (optional)
     * @type {string}
     * @example "REG123456789"
     */
    @ApiPropertyOptional({
        description: "Registration number of the vendor",
        example: "REG123456789"
    })
    registrationNumber?: string;

    /**
     * Tax identification number (optional)
     * @type {string}
     * @example "TAX987654321"
     */
    @ApiPropertyOptional({
        description: "Tax identification number",
        example: "TAX987654321"
    })
    taxId?: string;
}
