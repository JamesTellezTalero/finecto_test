import { Injectable } from "@nestjs/common";
import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceDto } from "../dtos/invoice.dto";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";

@Injectable()
export class CompanyBInvoiceProcessor implements IInvoiceProcessor {
    processInvoice(invoice: InvoiceDto): InvoiceOutputDto {
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

        return new InvoiceOutputDto(
            account,
            invoice.invoiceId,
            invoice.invoiceDate,
            invoice.lines
        );
    }
}
