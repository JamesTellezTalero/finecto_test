import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../constants/account.constant";
import { ProductCategory } from "../constants/product-category.constant";
import { InvoiceLine } from "./invoice-line.entity";

/**
 * Represents an invoice containing line items and associated metadata.
 * @class Invoice
 */
export class Invoice {
    /**
     * The account assigned to this invoice.
     * @type {string}
     */
    @ApiProperty({
        description: "The account assigned to this invoice",
        example: "ACC-12345"
    })
    public account: string;

    @ApiProperty({
        description: "Unique identifier for the invoice",
        example: "INV-2024-001"
    })
    public readonly invoiceId: string;

    @ApiProperty({
        description: "Date of the invoice (format: YYYY-MM-DD)",
        example: "2025-06-12"
    })
    public readonly invoiceDate: string;

    @ApiProperty({
        description: "List of line items included in the invoice",
        type: () => [InvoiceLine]
    })
    public readonly lines: InvoiceLine[];

    constructor(invoiceId: string, invoiceDate: string, lines: InvoiceLine[]) {
        this.invoiceId = invoiceId;
        this.invoiceDate = invoiceDate;
        this.lines = lines;
    }

    /**
     * Sets the account code assigned to this invoice.
     * @param {Account} account - Account code to assign.
     */
    setAccount(account: Account): void {
        this.account = account;
    }

    /**
     * Checks if the invoice contains any alcohol-related items.
     * @returns {boolean} True if at least one line item contains alcohol, otherwise false.
     */
    hasAlcoholItems(): boolean {
        return this.lines.some((line) => line.containsAlcohol());
    }

    /**
     * Checks if the invoice contains any tobacco-related items.
     * @returns {boolean} True if at least one line item contains tobacco, otherwise false.
     */
    hasTobaccoItems(): boolean {
        return this.lines.some((line) => line.containsTobacco());
    }

    /**
     * Retrieves the product categories represented in the invoice.
     * Includes ALCOHOL and TOBACCO if such items exist; otherwise defaults to STANDARD.
     * @returns {ProductCategory[]} An array of applicable product categories.
     */
    getProductCategories(): ProductCategory[] {
        const categories: ProductCategory[] = [];

        if (this.hasAlcoholItems()) categories.push(ProductCategory.ALCOHOL);
        if (this.hasTobaccoItems()) categories.push(ProductCategory.TOBACCO);
        if (categories.length === 0) categories.push(ProductCategory.STANDARD);

        return categories;
    }
}
