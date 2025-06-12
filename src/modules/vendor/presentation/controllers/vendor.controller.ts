import { Body, Controller, Post } from "@nestjs/common";
import { VendorInputDto } from "../dtos/vendor-input.dto";
import { VendorTransformUseCase } from "../../application/use-cases/vendor-transform.use-case";
import { SuccessResponse } from "src/shared/dtos/api-responses/success-response.dto";
import {
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
    getSchemaPath
} from "@nestjs/swagger";
import { ApiResponseDto } from "src/shared/dtos/api-responses/api-response.dto";
import { MappedError } from "src/shared/utils/mapper-errors.utils";
import { VendorOutputDto } from "../../application/dtos/vendor-output.dto";

/**
 * Controller for vendor operations
 * @class InvoiceController
 * @description Handles HTTP requests related to vendor processing and transformation
 */
@Controller("vendor")
@ApiTags("vendor")
@ApiExtraModels(ApiResponseDto, MappedError, VendorInputDto, VendorOutputDto)
export class VendorController {
    /**
     * Creates an instance of VendorController
     * @param {VendorTransformUseCase} vendorTransformUseCase - Use case for invoice transformation
     */
    constructor(
        private readonly vendorTransformUseCase: VendorTransformUseCase
    ) {}

    /**
     * Transforms vendor data based on company-specific rules
     * @param {VendorInputDto} vendorDto - vendor data to be transformed
     * @returns {Promise<SuccessResponse>} Success response with transformed vendor data
     * @description Processes and transforms vendor data, applying company-specific business rules
     * @throws {ConflictResponse} When company is not supported
     * @route POST /vendor
     * @example
     * POST /vendor
     * {
     *   "company": "B",
     *   "vendorName": "Trusted Suppliers LLC",
     *   "country": "US",
     *   "bank": "Local Bank Z"
     * }
     */
    @Post("")
    @ApiOperation({ summary: "success vendor transform" })
    @ApiBody({ type: VendorInputDto })
    @ApiResponse({
        status: 200,
        description: "success vendor transform",
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        status: { type: "number", example: 200 },
                        message: {
                            type: "string",
                            example: "success vendor transform"
                        },
                        item: {
                            $ref: getSchemaPath(VendorOutputDto)
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
    async VendorTransformData(@Body() vendorDto: VendorInputDto) {
        vendorDto = await VendorInputDto.FromPlain(vendorDto);

        return new SuccessResponse(
            "success vendor transform",
            await this.vendorTransformUseCase.execute(vendorDto)
        );
    }
}
