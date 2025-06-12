import { VendorOutputDto } from "../dtos/vendor-output.dto";
import { VendorDto } from "../dtos/vendor.dto";

/**
 * Interface for vendor processing implementations
 * @interface IVendorProcessor
 * @description Defines the contract for processing vendors from different companies
 */
export interface IVendorProcessor {
    /**
     * Processes a vendor and transforms it to output format
     * @param {VendorDto} vendor - Input vendor data to be processed
     * @returns {VendorOutputDto} Processed vendor in output format
     * @example
     * const result = processor.processVendor({
     *   company: "A",
     *   vendorName: "Tech Solutions",
     *   country: "US",
     *   bank: "Chase Bank"
     * });
     */
    processVendor(vendor: VendorDto): VendorOutputDto;
}
