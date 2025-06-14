import { Module } from "@nestjs/common";
import { InvoiceController } from "./presentation/controllers/invoice.controller";
import { InvoiceTransformUseCase } from "./application/use-cases/invoice-transform.use-case";
import { InvoiceProcessorFactory } from "./domain/factories/invoice-processor.factory";
import { CompanyAInvoiceProcessor } from "./domain/procesors/company-a-invoice.processor";
import { CompanyBInvoiceProcessor } from "./domain/procesors/company-b-invoice.processor";

@Module({
    providers: [
        InvoiceTransformUseCase,
        InvoiceProcessorFactory,
        CompanyAInvoiceProcessor,
        CompanyBInvoiceProcessor
    ],
    controllers: [InvoiceController]
})
export class InvoiceModule {}
