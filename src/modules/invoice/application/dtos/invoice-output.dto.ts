import { InvoiceLineOutputDto } from "./invoice-line-output.dto";

export class InvoiceOutputDto {
    account: string;
    invoiceDate: string;
    invoiceId: string;
    lines: InvoiceLineOutputDto[];

    constructor(
        account: string,
        invoiceId: string,
        invoiceDate: string,
        lines: InvoiceLineOutputDto[]
    ) {
        this.account = account;
        this.invoiceId = invoiceId;
        this.invoiceDate = invoiceDate;
        this.lines = lines;
    }
}
