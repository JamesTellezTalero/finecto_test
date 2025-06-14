import { Injectable } from "@nestjs/common";
import { InvoiceDto } from "../../application/dtos/invoice.dto";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";
import { Invoice } from "../entities/invoice.entity";
import { InvoiceLine } from "../entities/invoice-line.entity";

/**
 * Invoice processor implementation for Company B
 * @class CompanyBInvoiceProcessor
 * @implements {IInvoiceProcessor}
 * @description Processes invoices for Company B with alcohol and tobacco detection logic
 */
@Injectable()
export class CompanyBInvoiceProcessor implements IInvoiceProcessor {
    /**
     * Processes an invoice for Company B
     * @param {InvoiceDto} invoice - Input invoice data
     * @returns {Invoice} Processed invoice with appropriate account code
     * @description Assigns account codes based on product categories:
     * - "MULTI-B": Both alcohol and tobacco items
     * - "ALC-B": Only alcohol items
     * - "TOB-B": Only tobacco items
     * - "STD-B": Neither alcohol nor tobacco
     * @example
     * - Invoice with both alcohol and tobacco -> account: "MULTI-B"
     * - Invoice with only alcohol -> account: "ALC-B"
     * - Invoice with only tobacco -> account: "TOB-B"
     * - Regular invoice -> account: "STD-B"
     */
    processInvoice(invoice: InvoiceDto): Invoice {
        const hadAlcohol = invoice.lines.some((line) =>
            line.description.toLowerCase().includes("alcohol")
        );
        const hadTobacco = invoice.lines.some((line) =>
            line.description.toLowerCase().includes("tobacco")
        );

        let account = "";
        if (hadAlcohol && hadTobacco) account = "MULTI-B";
        else if (hadAlcohol) account = "ALC-B";
        else if (hadTobacco) account = "TOB-B";
        else account = "STD-B";

        return new Invoice(
            account,
            invoice.invoiceId,
            invoice.invoiceDate,
            invoice.lines.map(
                (line) => new InvoiceLine(line.description, line.amount)
            )
        );
    }
}
