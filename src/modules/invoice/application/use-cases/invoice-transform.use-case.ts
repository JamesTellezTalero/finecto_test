import { IUseCase } from "src/shared/interfaces/use-case.interface";
import { InvoiceDto } from "../dtos/invoice.dto";
import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceProcessorFactory } from "../factories/invoice-processor.factory";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InvoiceTransformUseCase
    implements IUseCase<InvoiceDto, InvoiceOutputDto>
{
    constructor(
        private readonly invoiceProcessorFactory: InvoiceProcessorFactory
    ) {}

    async execute(input: InvoiceDto): Promise<InvoiceOutputDto> {
        console.log("InvoiceTransformUseCase company: ", input.company);
        const processor = this.invoiceProcessorFactory.createInvoiceProcessor(
            input.company
        );
        console.log("processor: ", processor);
        const result = processor.processInvoice(input);
        return result;
    }
}
