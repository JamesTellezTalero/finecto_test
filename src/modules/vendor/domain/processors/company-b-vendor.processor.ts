import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { VendorDto } from "../../application/dtos/vendor.dto";
import { Vendor } from "../entities/vendor.entity";

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
     * @returns {Vendor} Processed vendor with status validation
     * @description Validates US vendors have required registration and tax documentation:
     * - "Incomplete - missing registration/tax details": Both missing
     * - "Incomplete - missing registration details": Only registration missing
     * - "Incomplete - missing tax details": Only tax ID missing
     * - "Verified": All required documentation present or non-US vendor
     * @example
     * - US vendor with both docs -> status: "Verified"
     * - US vendor missing both -> status: "Incomplete - missing registration/tax details"
     */
    processVendor(vendorDto: VendorDto): Vendor {
        const vendor = new Vendor(
            vendorDto.vendorName,
            vendorDto.country,
            vendorDto.bank,
            vendorDto.registrationNumber,
            vendorDto.taxId
        );

        if (
            vendor.isFromUS() &&
            !vendor.hasRegistrationNumber() &&
            !vendor.hasTaxId()
        )
            vendor.setVendorStatus(
                "Incomplete - missing registration/tax details"
            );
        else if (vendor.isFromUS() && !vendor.hasRegistrationNumber())
            vendor.setVendorStatus("Incomplete - missing registration details");
        else if (vendor.isFromUS() && !vendor.hasTaxId())
            vendor.setVendorStatus("Incomplete - missing tax details");
        else vendor.setVendorStatus("Verified");

        delete vendor.registrationNumber;
        delete vendor.taxId;

        return vendor;
    }
}
