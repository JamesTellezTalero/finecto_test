import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { VendorDto } from "../../application/dtos/vendor.dto";
import { Vendor } from "../entities/vendor.entity";

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
     * @returns {Vendor} Processed vendor with international bank check
     * @description Adds international bank confirmation request for non-US vendors
     * @example
     * // US vendor -> no additional requirements
     * // Non-US vendor -> internationalBank: "Please confirm international bank details"
     */
    processVendor(vendorDto: VendorDto): Vendor {
        const vendor = new Vendor(
            vendorDto.vendorName,
            vendorDto.country,
            vendorDto.bank
        );
        // Company A Business Logic: International Vendor Check
        if (!vendor.isFromUS()) {
            vendor.internationalBank =
                "Please confirm international bank details";
        }

        return vendor;
    }
}
