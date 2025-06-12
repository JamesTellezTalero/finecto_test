import { Body, Controller, Post } from "@nestjs/common";
import { InvoiceInputDto } from "../dtos/invoice-input.dto";
import { InvoiceTransformUseCase } from "../../application/use-cases/invoice-transform.use-case";
import { SuccessResponse } from "src/shared/dtos/api-responses/success-response.dto";

@Controller("invoice")
export class InvoiceController {
    constructor(
        private readonly invoiceTransformUseCase: InvoiceTransformUseCase
    ) {}

    @Post("")
    async InvoiceTransformData(@Body() invoiceDto: InvoiceInputDto) {
        invoiceDto = await InvoiceInputDto.FromPlain(invoiceDto);
        return new SuccessResponse(
            "success invoice transform",
            await this.invoiceTransformUseCase.execute(invoiceDto)
        );
    }
}
