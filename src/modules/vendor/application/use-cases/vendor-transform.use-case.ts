import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/interfaces/use-case.interface";
import { VendorDto } from "../dtos/vendor.dto";
import { VendorProcessorFactory } from "../../domain/factories/vendor-processor.factory";
import { JsonlDbUtils } from "src/shared/utils/jsonl-db.utils";
import { Vendor } from "../../domain/entities/vendor.entity";

/**
 * Use case for transforming vendor data based on company-specific rules
 * @class VendorTransformUseCase
 * @implements {IUseCase<VendorDto, Vendor>}
 * @description Orchestrates vendor processing by selecting appropriate processor and logging results
 */
@Injectable()
export class VendorTransformUseCase implements IUseCase<VendorDto, Vendor> {
    /**
     * Creates an instance of VendorTransformUseCase
     * @param {VendorProcessorFactory} vendorProcessorFactory - Factory for creating vendor processors
     */
    constructor(
        private readonly vendorProcessorFactory: VendorProcessorFactory
    ) {}

    /**
     * Executes the vendor transformation process
     * @param {VendorDto} vendor - Input vendor data to be transformed
     * @returns {Promise<Vendor>} Transformed vendor data
     * @description Processes vendor using company-specific logic and logs the result
     * @throws {ConflictResponse} When company is not supported by the factory
     * @example
     * const result = await useCase.execute({
     *   company: "A",
     *   vendorName: "Tech Solutions",
     *   country: "USA",
     *   bank: "Chase Bank"
     * });
     */
    async execute(vendor: VendorDto): Promise<Vendor> {
        const processor = this.vendorProcessorFactory.createVendorProcessor(
            vendor.company
        );
        const result = processor.processVendor(vendor);

        JsonlDbUtils.append({ type: "vendor", ...result });
        return result;
    }
}
