import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { BaseDto } from "src/shared/dtos/base/base.dto";

export class VendorDto {
    company: string;
    vendorName: string;
    country: string;
    bank: string;
    registrationNumber?: string;
    taxId?: string;
}
