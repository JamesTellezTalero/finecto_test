import { InvoiceDto } from "../../application/dtos/invoice.dto";
import { Invoice } from "../entities/invoice.entity";

/**
 * Interface for invoice processing implementations
 * @interface IInvoiceProcessor
 * @description Defines the contract for processing invoices from different companies
 */
export interface IInvoiceProcessor {
    /**
     * Processes an invoice and transforms it to output format
     * @param {InvoiceDto} invoice - Input invoice data to be processed
     * @returns {Invoice} Processed invoice in output format
     * @example
     * const result = processor.processInvoice({
     *   company: "A",
     *   invoiceId: "INV-001",
     *   invoiceDate: "2024-03-15",
     *   lines: [{ description: "Service", amount: 100 }]
     * });
     */
    processInvoice(invoice: InvoiceDto): Invoice;
}
