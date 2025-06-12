import { Body, Controller, Post } from "@nestjs/common";
import { VendorInputDto } from "../dtos/vendor-input.dto";
import { VendorTransformUseCase } from "../../application/use-cases/vendor-transform.use-case";
import { SuccessResponse } from "src/shared/dtos/api-responses/success-response.dto";

@Controller("vendor")
export class VendorController {
    constructor(
        private readonly vendorTransformUseCase: VendorTransformUseCase
    ) {}

    @Post("")
    async VendorTransformData(@Body() vendorDto: VendorInputDto) {
        vendorDto = await VendorInputDto.FromPlain(vendorDto);

        return new SuccessResponse(
            "success vendor transform",
            await this.vendorTransformUseCase.execute(vendorDto)
        );
    }
}
