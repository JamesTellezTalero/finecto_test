import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { VendorDto } from "../dtos/vendor.dto";
import { VendorOutputDto } from "../dtos/vendor-output.dto";

/**
 * Vendor processor implementation for Company B
 * @class CompanyBVendorProcessor
 * @implements {IVendorProcessor}
 * @description Processes vendors for Company B with US vendor documentation validation
 */
@Injectable()
export class CompanyBVendorProcessor implements IVendorProcessor {
    /**
     * Processes a vendor for Company B
     * @param {VendorDto} vendor - Input vendor data
     * @returns {VendorOutputDto} Processed vendor with status validation
     * @description Validates US vendors have required registration and tax documentation:
     * - "Incomplete - missing registration/tax details": Both missing
     * - "Incomplete - missing registration details": Only registration missing
     * - "Incomplete - missing tax details": Only tax ID missing
     * - "Verified": All required documentation present or non-US vendor
     * @example
     * - US vendor with both docs -> status: "Verified"
     * - US vendor missing both -> status: "Incomplete - missing registration/tax details"
     */
    processVendor(vendor: VendorDto): VendorOutputDto {
        const transformedVendor = new VendorOutputDto(
            vendor.vendorName,
            vendor.country,
            vendor.bank
        );

        if (
            vendor.country.toLocaleUpperCase() === "US" &&
            vendor.registrationNumber == null &&
            vendor.taxId == null
        )
            transformedVendor.vendorStatus =
                "Incomplete - missing registration/tax details";
        else if (
            vendor.country.toLocaleUpperCase() === "US" &&
            vendor.registrationNumber == null
        )
            transformedVendor.vendorStatus =
                "Incomplete - missing registration details";
        else if (
            vendor.country.toLocaleUpperCase() === "US" &&
            vendor.taxId == null
        )
            transformedVendor.vendorStatus = "Incomplete - missing tax details";

        transformedVendor.vendorStatus =
            transformedVendor.vendorStatus != null
                ? transformedVendor.vendorStatus
                : "Verified";

        return transformedVendor;
    }
}
