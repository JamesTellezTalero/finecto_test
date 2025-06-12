import { IUseCase } from "src/shared/interfaces/use-case.interface";
import { InvoiceDto } from "../dtos/invoice.dto";
import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceProcessorFactory } from "../factories/invoice-processor.factory";
import { Injectable } from "@nestjs/common";
import { JsonlDbUtils } from "src/shared/utils/jsonl-db.utils";

@Injectable()
export class InvoiceTransformUseCase
    implements IUseCase<InvoiceDto, InvoiceOutputDto>
{
    constructor(
        private readonly invoiceProcessorFactory: InvoiceProcessorFactory
    ) {}

    async execute(input: InvoiceDto): Promise<InvoiceOutputDto> {
        const processor = this.invoiceProcessorFactory.createInvoiceProcessor(
            input.company
        );
        const result = processor.processInvoice(input);

        JsonlDbUtils.append({ type: "invoice", ...result });
        return result;
    }
}
