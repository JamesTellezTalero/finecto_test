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
    company: string;

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
     * Registration number of the vendor (optional)
     * @type {string}
     * @example "REG123456789"
     * @optional
     */
    registrationNumber?: string;

    /**
     * Tax identification number (optional)
     * @type {string}
     * @example "TAX987654321"
     * @optional
     */
    taxId?: string;
}
