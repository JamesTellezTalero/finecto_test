import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/interfaces/use-case.interface";
import { VendorDto } from "../dtos/vendor.dto";
import { VendorOutputDto } from "../dtos/vendor-output.dto";
import { VendorProcessorFactory } from "../factories/vendor-processor.factory";

@Injectable()
export class CreateBankUseCase implements IUseCase<VendorDto, VendorOutputDto> {
    constructor(
        private readonly vendorProcessorFactory: VendorProcessorFactory
    ) {}

    async execute(vendor: VendorDto): Promise<VendorOutputDto> {
        const processor = this.vendorProcessorFactory.createVendorProcessor(
            vendor.company
        );
        const result = processor.processVendor(vendor);
        return result;
    }
}
