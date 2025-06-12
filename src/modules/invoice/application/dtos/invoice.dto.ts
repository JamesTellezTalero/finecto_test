import { InvoiceLineDto } from "./invoice-line.dto";

export class InvoiceDto {
    company: string;
    invoiceId: string;
    invoiceDate: string;
    lines: InvoiceLineDto[];
}
