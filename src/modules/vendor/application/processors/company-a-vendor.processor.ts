import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { VendorDto } from "../dtos/vendor.dto";
import { VendorOutputDto } from "../dtos/vendor-output.dto";

/**
 * Vendor processor implementation for Company A
 * @class CompanyAVendorProcessor
 * @implements {IVendorProcessor}
 * @description Processes vendors for Company A with international bank validation
 */
@Injectable()
export class CompanyAVendorProcessor implements IVendorProcessor {
    /**
     * Processes a vendor for Company A
     * @param {VendorDto} vendor - Input vendor data
     * @returns {VendorOutputDto} Processed vendor with international bank check
     * @description Adds international bank confirmation request for non-US vendors
     * @example
     * // US vendor -> no additional requirements
     * // Non-US vendor -> internationalBank: "Please confirm international bank details"
     */
    processVendor(vendor: VendorDto): VendorOutputDto {
        const transformedVendor = new VendorOutputDto(
            vendor.vendorName,
            vendor.country,
            vendor.bank
        );
        // Company A Business Logic: International Vendor Check
        if (vendor.country.toLocaleUpperCase() !== "US") {
            transformedVendor.internationalBank =
                "Please confirm international bank details";
        }

        return transformedVendor;
    }
}
