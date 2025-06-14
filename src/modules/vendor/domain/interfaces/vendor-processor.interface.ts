import { VendorDto } from "../../application/dtos/vendor.dto";
import { Vendor } from "../entities/vendor.entity";

/**
 * Interface for vendor processing implementations
 * @interface IVendorProcessor
 * @description Defines the contract for processing vendors from different companies
 */
export interface IVendorProcessor {
    /**
     * Processes a vendor and transforms it to output format
     * @param {VendorDto} vendor - Input vendor data to be processed
     * @returns {Vendor} Processed vendor in output format
     * @example
     * const result = processor.processVendor({
     *   company: "A",
     *   vendorName: "Tech Solutions",
     *   country: "US",
     *   bank: "Chase Bank"
     * });
     */
    processVendor(vendor: VendorDto): Vendor;
}
