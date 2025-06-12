import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { CompanyAVendorProcessor } from "../processors/company-a-vendor.processor";
import { CompanyBVendorProcessor } from "../processors/company-b-vendor.processor";
import { ConflictResponse } from "src/shared/dtos/api-responses/errors/conflict-error-response.dto";

@Injectable()
export class VendorProcessorFactory {
    createVendorProcessor(company: string): IVendorProcessor {
        switch (company.toUpperCase()) {
            case "A":
                return new CompanyAVendorProcessor();
            case "B":
                return new CompanyBVendorProcessor();
            default:
                throw new ConflictResponse(`Unsupported company: ${company}`);
        }
    }
}
