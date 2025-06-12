import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { BaseDto } from "src/shared/dtos/base/base.dto";

export class VendorInputDto extends BaseDto<VendorInputDto> {
    @Expose()
    @IsString()
    @IsNotEmpty()
    company: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    vendorName: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    country: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    bank: string;
    @Expose()
    @IsString()
    @IsOptional()
    registrationNumber: string;
    @Expose()
    @IsString()
    @IsOptional()
    taxId: string;
}
