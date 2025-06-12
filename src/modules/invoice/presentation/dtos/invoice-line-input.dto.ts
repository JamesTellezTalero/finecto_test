import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class InvoiceLineInputDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    description: string;
    @Expose()
    @IsNumber()
    @IsPositive()
    amount: number;
}
