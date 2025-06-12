import { Module } from "@nestjs/common";
import { InvoiceController } from "./presentation/controllers/invoice.controller";
import { InvoiceTransformUseCase } from "./application/use-cases/invoice-transform.use-case";
import { InvoiceProcessorFactory } from "./application/factories/invoice-processor.factory";
import { CompanyAInvoiceProcessor } from "./application/procesors/company-a-invoice.processor";
import { CompanyBInvoiceProcessor } from "./application/procesors/company-b-invoice.processor";

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
