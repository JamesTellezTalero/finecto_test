import { Injectable } from "@nestjs/common";
import { IVendorProcessor } from "../interfaces/vendor-processor.interface";
import { CompanyAVendorProcessor } from "../processors/company-a-vendor.processor";
import { CompanyBVendorProcessor } from "../processors/company-b-vendor.processor";
import { ConflictResponse } from "src/shared/dtos/api-responses/errors/conflict-error-response.dto";
import { CompanyType } from "../constants/company-type.constant";

/**
 * Factory service for creating vendor processors based on company type
 * @class VendorProcessorFactory
 * @description Creates appropriate vendor processor instances based on company identifier
 */
@Injectable()
export class VendorProcessorFactory {
    /**
     * Creates a vendor processor instance for the specified company
     * @param {string} company - Company identifier (case-insensitive)
     * @returns {IVendorProcessor} Vendor processor instance for the company
     * @throws {ConflictResponse} When company is not supported
     * @example
     * const processor = factory.createVendorProcessor("A");
     */
    createVendorProcessor(company: string): IVendorProcessor {
        switch (company.toUpperCase()) {
            case CompanyType.COMPANY_A:
                return new CompanyAVendorProcessor();
            case CompanyType.COMPANY_B:
                return new CompanyBVendorProcessor();
            default:
                throw new ConflictResponse(`Unsupported company: ${company}`);
        }
    }
}
