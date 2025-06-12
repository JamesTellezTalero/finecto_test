import { Injectable } from "@nestjs/common";
import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceDto } from "../dtos/invoice.dto";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";

@Injectable()
export class CompanyAInvoiceProcessor implements IInvoiceProcessor {
    processInvoice(invoice: InvoiceDto): InvoiceOutputDto {
        console.log("invoice: ", invoice);

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
