import { Module } from "@nestjs/common";
import { VendorController } from "./presentation/controllers/vendor.controller";
import { VendorTransformUseCase } from "./application/use-cases/vendor-transform.use-case";
import { CompanyAVendorProcessor } from "./application/processors/company-a-vendor.processor";
import { VendorProcessorFactory } from "./application/factories/vendor-processor.factory";

@Module({
    providers: [
        VendorTransformUseCase,
        CompanyAVendorProcessor,
        VendorProcessorFactory
    ],
    controllers: [VendorController]
})
export class VendorModule {}
