import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Country } from "../constants/country.constant";

/**
 * Vendor domain entity
 * @description Core business entity representing a vendor
 */
export class Vendor {
    @ApiProperty({
        description: "Name of the vendor",
        example: "Tech Solutions Inc"
    })
    vendorName: string;

    @ApiProperty({
        description: "Country where the vendor is located",
        example: "US"
    })
    country: string;

    @ApiProperty({
        description: "Primary bank used by the vendor",
        example: "Bank of America"
    })
    bank: string;

    @ApiPropertyOptional({
        description: "Registration number of the vendor",
        example: "REG-123456"
    })
    registrationNumber?: string;

    @ApiPropertyOptional({
        description: "Tax identification number of the vendor",
        example: "TAX-987654"
    })
    taxId?: string;

    internationalBank: string;

    vendorStatus: string;

    /**
     * Constructs a VendorDto instance.
     * @param vendorName - Name of the vendor
     * @param country - Country of operation
     * @param bank - Primary bank
     * @param registrationNumber - Optional registration number
     * @param taxId - Optional tax ID
     */
    constructor(
        vendorName: string,
        country: string,
        bank: string,
        registrationNumber?: string,
        taxId?: string
    ) {
        this.vendorName = vendorName;
        this.country = country;
        this.bank = bank;
        this.registrationNumber = registrationNumber;
        this.taxId = taxId;
    }

    setInternationalBank(internationalBank: string): void {
        this.internationalBank = internationalBank;
        return;
    }

    setVendorStatus(vendorStatus: string): void {
        this.vendorStatus = vendorStatus;
        return;
    }

    /**
     * Checks if vendor is located in the United States
     * @returns {boolean} True if vendor is from US
     */
    isFromUS(): boolean {
        return this.country.toUpperCase() === Country.COUNTRY_US;
    }

    /**
     * Checks if vendor has registration number
     * @returns {boolean} True if registration number exists
     */
    hasRegistrationNumber(): boolean {
        return (
            this.registrationNumber != null &&
            this.registrationNumber.trim() !== ""
        );
    }

    /**
     * Checks if vendor has tax ID
     * @returns {boolean} True if tax ID exists
     */
    hasTaxId(): boolean {
        return this.taxId != null && this.taxId.trim() !== "";
    }
}
