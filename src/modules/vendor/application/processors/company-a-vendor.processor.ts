import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { VendorDto } from "../dtos/vendor.dto";
import { VendorOutputDto } from "../dtos/vendor-output.dto";

@Injectable()
export class CompanyAVendorProcessor implements IVendorProcessor {
    processVendor(vendor: VendorDto): VendorOutputDto {
        const transformedVendor = new VendorOutputDto(
            vendor.vendorName,
            vendor.country,
            vendor.bank
        );
        // Company A Business Logic: International Vendor Check
        if (vendor.country !== "US") {
            transformedVendor.internationalBank =
                "Please confirm international bank details";
        }

        return transformedVendor;
    }
}
