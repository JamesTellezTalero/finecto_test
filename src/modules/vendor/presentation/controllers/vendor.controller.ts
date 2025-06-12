import { Body, Controller, Post } from "@nestjs/common";
import { VendorInputDto } from "../dtos/vendor.dto";
import { CreateBankUseCase } from "../../application/use-cases/vendor-transform.use-case";

@Controller("vendor")
export class VendorController {
    constructor(private readonly createBankUseCase: CreateBankUseCase) {}

    @Post("")
    async VendorTransformData(@Body() vendorDto: VendorInputDto) {
        vendorDto = await VendorInputDto.FromPlain(vendorDto);

        return await this.createBankUseCase.execute(vendorDto);
    }
}
