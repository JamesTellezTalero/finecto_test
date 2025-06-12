import { Body, Controller, Post } from "@nestjs/common";
import { InvoiceInputDto } from "../dtos/invoice-input.dto";
import { InvoiceTransformUseCase } from "../../application/use-cases/invoice-transform.use-case";
import { SuccessResponse } from "src/shared/dtos/api-responses/success-response.dto";
import {
    ApiBearerAuth,
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
    getSchemaPath
} from "@nestjs/swagger";
import { ApiResponseDto } from "src/shared/dtos/api-responses/api-response.dto";
import { MappedError } from "src/shared/utils/mapper-errors.utils";
import { InvoiceLineInputDto } from "../dtos/invoice-line-input.dto";
import { InvoiceOutputDto } from "../../application/dtos/invoice-output.dto";
import { InvoiceLineOutputDto } from "../../application/dtos/invoice-line-output.dto";

/**
 * Controller for invoice operations
 * @class InvoiceController
 * @description Handles HTTP requests related to invoice processing and transformation
 */
@Controller("invoice")
@ApiTags("transfer")
@ApiExtraModels(
    ApiResponseDto,
    MappedError,
    InvoiceLineInputDto,
    InvoiceInputDto,
    InvoiceLineOutputDto,
    InvoiceOutputDto
)
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
    @ApiOperation({ summary: "success invoice transform" })
    @ApiBody({ type: InvoiceInputDto })
    @ApiResponse({
        status: 200,
        description: "success invoice transform",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "success invoice transform"
                        },
                        item: {
                            $ref: getSchemaPath(InvoiceOutputDto)
                        },
                        errors: {
                            nullable: true
                        }
                    }
                }
            ]
        }
    })
    @ApiResponse({
        status: 400,
        description: "Incomplete Fields",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        status: { type: "number", example: 400 },
                        message: {
                            type: "string",
                            example: "Incomplete Fields"
                        },
                        item: {
                            nullable: true
                        },
                        errors: {
                            type: "array",
                            items: {
                                $ref: getSchemaPath(MappedError)
                            }
                        }
                    }
                }
            ]
        }
    })
    async InvoiceTransformData(@Body() invoiceDto: InvoiceInputDto) {
        invoiceDto = await InvoiceInputDto.FromPlain(invoiceDto);
        return new SuccessResponse(
            "success invoice transform",
            await this.invoiceTransformUseCase.execute(invoiceDto)
        );
    }
}
