import { IUseCase } from "src/shared/interfaces/use-case.interface";
import { InvoiceDto } from "../dtos/invoice.dto";
import { InvoiceProcessorFactory } from "../../domain/factories/invoice-processor.factory";
import { Injectable } from "@nestjs/common";
import { JsonlDbUtils } from "src/shared/utils/jsonl-db.utils";
import { Invoice } from "../../domain/entities/invoice.entity";

/**
 * Use case for transforming invoice data based on company-specific rules
 * @class InvoiceTransformUseCase
 * @implements {IUseCase<InvoiceDto, InvoiceOutputDto>}
 * @description Orchestrates invoice processing by selecting appropriate processor and logging results
 */
@Injectable()
export class InvoiceTransformUseCase implements IUseCase<InvoiceDto, Invoice> {
    /**
     * Creates an instance of InvoiceTransformUseCase
     * @param {InvoiceProcessorFactory} invoiceProcessorFactory - Factory for creating invoice processors
     */
    constructor(
        private readonly invoiceProcessorFactory: InvoiceProcessorFactory
    ) {}

    /**
     * Executes the invoice transformation process
     * @param {InvoiceDto} input - Input invoice data to be transformed
     * @returns {Promise<InvoiceOutputDto>} Transformed invoice data
     * @description Processes invoice using company-specific logic and logs the result
     * @throws {ConflictResponse} When company is not supported by the factory
     * @example
     * const result = await useCase.execute({
     *   company: "A",
     *   invoiceId: "INV-001",
     *   invoiceDate: "2024-03-15",
     *   lines: [{ description: "Software license", amount: 299.99 }]
     * });
     */
    async execute(input: InvoiceDto): Promise<Invoice> {
        const processor = this.invoiceProcessorFactory.createInvoiceProcessor(
            input.company
        );
        const result = processor.processInvoice(input);

        JsonlDbUtils.append({ type: "invoice", ...result });
        return result;
    }
}
