import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { InvoiceLineInputDto } from "./invoice-line-input.dto";
import { Expose, Type } from "class-transformer";
import { BaseDto } from "src/shared/dtos/base/base.dto";

export class InvoiceInputDto extends BaseDto<InvoiceInputDto> {
    @Expose()
    @IsString()
    @IsNotEmpty()
    company: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    invoiceDate: string;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InvoiceLineInputDto)
    lines: InvoiceLineInputDto[];
}
