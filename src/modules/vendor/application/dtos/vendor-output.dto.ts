import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Output DTO for vendor data
 * @class VendorOutputDto
 * @description Represents vendor information returned by the API
 */
export class VendorOutputDto {
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
     * International bank information (optional)
     * @type {string}
     * @example "SWIFT: CHASUS33"
     * @optional
     */
    @ApiPropertyOptional({
        description: "International bank information",
        example: "SWIFT: CHASUS33"
    })
    internationalBank?: string;

    /**
     * Current status of the vendor (optional)
     * @type {string}
     * @example "ACTIVE"
     * @optional
     */
    @ApiPropertyOptional({
        description: "Current status of the vendor",
        example: "ACTIVE"
    })
    vendorStatus?: string;

    /**
     * Creates an instance of VendorOutputDto
     */
    constructor(vendorName: string, country: string, bank: string) {
        this.vendorName = vendorName;
        this.country = country;
        this.bank = bank;
    }
}
