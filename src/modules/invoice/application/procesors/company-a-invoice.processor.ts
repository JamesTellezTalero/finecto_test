import { Injectable } from "@nestjs/common";
import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceDto } from "../dtos/invoice.dto";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";

/**
 * Invoice processor implementation for Company A
 * @class CompanyAInvoiceProcessor
 * @implements {IInvoiceProcessor}
 * @description Processes invoices for Company A with alcohol detection logic
 */
@Injectable()
export class CompanyAInvoiceProcessor implements IInvoiceProcessor {
    /**
     * Processes an invoice for Company A
     * @param {InvoiceDto} invoice - Input invoice data
     * @returns {InvoiceOutputDto} Processed invoice with appropriate account code
     * @description Assigns account "ALC-001" if alcohol items are found, otherwise "STD-001"
     * @example
     * Invoice with alcohol items -> account: "ALC-001"
     * Invoice without alcohol -> account: "STD-001"
     */
    processInvoice(invoice: InvoiceDto): InvoiceOutputDto {
        const hadAlcohol = invoice.lines.some((line) =>
            line.description.toLowerCase().includes("alcohol")
        );

        return new InvoiceOutputDto(
            hadAlcohol == true ? "ALC-001" : "STD-001",
            invoice.invoiceId,
            invoice.invoiceDate,
            invoice.lines
        );
    }
}
