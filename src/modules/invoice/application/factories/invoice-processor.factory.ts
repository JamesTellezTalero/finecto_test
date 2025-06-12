import { Injectable } from "@nestjs/common";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";
import { CompanyAInvoiceProcessor } from "../procesors/company-a-invoice.processor";
import { CompanyBInvoiceProcessor } from "../procesors/company-b-invoice.processor";
import { ConflictResponse } from "src/shared/dtos/api-responses/errors/conflict-error-response.dto";

@Injectable()
export class InvoiceProcessorFactory {
    createInvoiceProcessor(company: string): IInvoiceProcessor {
        switch (company.toUpperCase()) {
            case "A":
                return new CompanyAInvoiceProcessor();
            case "B":
                return new CompanyBInvoiceProcessor();
            default:
                throw new ConflictResponse(`Unsupported company: ${company}`);
        }
    }
}
