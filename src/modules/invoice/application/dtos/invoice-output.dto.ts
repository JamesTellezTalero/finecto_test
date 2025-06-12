import { InvoiceLineOutputDto } from "./invoice-line-output.dto";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Output DTO for invoice data
 * @class InvoiceOutputDto
 */
export class InvoiceOutputDto {
    /**
     * Account identifier
     * @type {string}
     * @example "ACC-12345"
     */
    @ApiProperty({
        description: "Account identifier",
        example: "ACC-12345"
    })
    account: string;

    /**
     * Invoice date in string format
     * @type {string}
     * @example "2024-03-15"
     */
    @ApiProperty({
        description: "Invoice date in string format",
        example: "2024-03-15"
    })
    invoiceDate: string;

    /**
     * Unique invoice identifier
     * @type {string}
     * @example "INV-2024-001"
     */
    @ApiProperty({
        description: "Unique invoice identifier",
        example: "INV-2024-001"
    })
    invoiceId: string;

    /**
     * Array of invoice line items
     * @type {InvoiceLineOutputDto[]}
     * @example [{ description: "Software license", amount: 299.99 }]
     */
    @ApiProperty({
        description: "Array of invoice line items",
        type: [InvoiceLineOutputDto],
        example: [
            {
                description: "Software license - alcohol",
                amount: 299.99
            },
            { description: "Software license", amount: 299.99 }
        ]
    })
    lines: InvoiceLineOutputDto[];

    constructor(
        account: string,
        invoiceId: string,
        invoiceDate: string,
        lines: InvoiceLineOutputDto[]
    ) {
        this.account = account;
        this.invoiceId = invoiceId;
        this.invoiceDate = invoiceDate;
        this.lines = lines;
    }
}
