import { Body, Controller, Post } from "@nestjs/common";
import { InvoiceInputDto } from "../dtos/invoice-input.dto";
import { InvoiceTransformUseCase } from "../../application/use-cases/invoice-transform.use-case";
import { SuccessResponse } from "src/shared/dtos/api-responses/success-response.dto";

/**
 * Controller for invoice operations
 * @class InvoiceController
 * @description Handles HTTP requests related to invoice processing and transformation
 */
@Controller("invoice")
export class InvoiceController {
    /**
     * Creates an instance of InvoiceController
     * @param {InvoiceTransformUseCase} invoiceTransformUseCase - Use case for invoice transformation
     */
    constructor(
        private readonly invoiceTransformUseCase: InvoiceTransformUseCase
    ) {}

    /**
     * Transforms invoice data based on company-specific rules
     * @param {InvoiceInputDto} invoiceDto - Invoice data to be transformed
     * @returns {Promise<SuccessResponse>} Success response with transformed invoice data
     * @description Processes and transforms invoice data, applying company-specific business rules
     * @throws {ConflictResponse} When company is not supported
     * @route POST /invoice
     * @example
     * POST /invoice
     * {
     *   "company": "A",
     *   "invoiceId": "INV-001",
     *   "invoiceDate": "2024-03-15",
     *   "lines": [{ "description": "Software license", "amount": 299.99 }]
     * }
     */
    @Post("")
    async InvoiceTransformData(@Body() invoiceDto: InvoiceInputDto) {
        invoiceDto = await InvoiceInputDto.FromPlain(invoiceDto);
        return new SuccessResponse(
            "success invoice transform",
            await this.invoiceTransformUseCase.execute(invoiceDto)
        );
    }
}
