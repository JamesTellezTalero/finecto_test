import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { VendorDto } from "../dtos/vendor.dto";
import { VendorOutputDto } from "../dtos/vendor-output.dto";

@Injectable()
export class CompanyBVendorProcessor implements IVendorProcessor {
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
