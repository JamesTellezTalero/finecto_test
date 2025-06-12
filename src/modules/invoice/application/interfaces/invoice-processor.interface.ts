import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceDto } from "../dtos/invoice.dto";

export interface IInvoiceProcessor {
    processInvoice(invoice: InvoiceDto): InvoiceOutputDto;
}
