import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { BaseDto } from "src/shared/dtos/base/base.dto";

export class VendorOutputDto {
    vendorName: string;
    country: string;
    bank: string;
    internationalBank?: string;
    vendorStatus?: string;

    constructor(vendorName: string, country: string, bank: string) {
        this.vendorName = vendorName;
        this.country = country;
        this.bank = bank;
    }
}
