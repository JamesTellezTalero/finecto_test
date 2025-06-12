import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { BaseDto } from "src/shared/dtos/base/base.dto";

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
    vendorName: string;

    /**
     * Country where the vendor is located
     * @type {string}
     * @example "USA"
     */
    country: string;

    /**
     * Primary bank of the vendor
     * @type {string}
     * @example "Chase Bank"
     */
    bank: string;

    /**
     * International bank information (optional)
     * @type {string}
     * @example "SWIFT: CHASUS33"
     * @optional
     */
    internationalBank?: string;

    /**
     * Current status of the vendor (optional)
     * @type {string}
     * @example "ACTIVE"
     * @optional
     */
    vendorStatus?: string;

    /**
     * Creates an instance of VendorOutputDto
     * @param {string} vendorName - Name of the vendor
     * @param {string} country - Country where the vendor is located
     * @param {string} bank - Primary bank of the vendor
     */
    constructor(vendorName: string, country: string, bank: string) {
        this.vendorName = vendorName;
        this.country = country;
        this.bank = bank;
    }
}
