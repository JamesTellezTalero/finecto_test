import { Injectable } from "@nestjs/common";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";
import { CompanyAInvoiceProcessor } from "../procesors/company-a-invoice.processor";
import { CompanyBInvoiceProcessor } from "../procesors/company-b-invoice.processor";
import { ConflictResponse } from "src/shared/dtos/api-responses/errors/conflict-error-response.dto";
import { CompanyType } from "../constants/company-type.constant";

/**
 * Factory service for creating invoice processors based on company type
 * @class InvoiceProcessorFactory
 * @description Creates appropriate invoice processor instances based on company identifier
 */
@Injectable()
export class InvoiceProcessorFactory {
    /**
     * Creates an invoice processor instance for the specified company
     * @param {string} company - Company identifier (case-insensitive)
     * @returns {IInvoiceProcessor} Invoice processor instance for the company
     * @throws {ConflictResponse} When company is not supported
     * @example
     * const processor = factory.createInvoiceProcessor("A");
     * @example
     * const processor = factory.createInvoiceProcessor("b");
     */
    createInvoiceProcessor(company: string): IInvoiceProcessor {
        switch (company.toUpperCase()) {
            case CompanyType.COMPANY_A:
                return new CompanyAInvoiceProcessor();
            case CompanyType.COMPANY_B:
                return new CompanyBInvoiceProcessor();
            default:
                throw new ConflictResponse(`Unsupported company: ${company}`);
        }
    }
}
