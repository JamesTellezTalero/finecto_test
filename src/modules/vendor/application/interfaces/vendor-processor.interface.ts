import { VendorOutputDto } from "../dtos/vendor-output.dto";
import { VendorDto } from "../dtos/vendor.dto";

export interface IVendorProcessor {
    processVendor(vendor: VendorDto): VendorOutputDto;
}
