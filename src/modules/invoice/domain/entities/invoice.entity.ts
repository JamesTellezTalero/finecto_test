import { ProductCategory } from "../constants/product-category.constant";
import { InvoiceLine } from "./invoice-line.entity";

/**
 * Represents an invoice containing line items and associated metadata.
 * @class Invoice
 */
export class Invoice {
    /**
     * Creates an instance of Invoice.
     * @param {string} company - Identifier for the company issuing the invoice.
     * @param {string} invoiceId - Unique identifier for the invoice.
     * @param {string} invoiceDate - Date of the invoice (format: YYYY-MM-DD).
     * @param {InvoiceLine[]} lines - List of line items included in the invoice.
     */
    constructor(
        public readonly company: string,
        public readonly invoiceId: string,
        public readonly invoiceDate: string,
        public readonly lines: InvoiceLine[]
    ) {}

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

        if (this.hasAlcoholItems()) {
            categories.push(ProductCategory.ALCOHOL);
        }

        if (this.hasTobaccoItems()) {
            categories.push(ProductCategory.TOBACCO);
        }

        if (categories.length === 0) {
            categories.push(ProductCategory.STANDARD);
        }

        return categories;
    }
}
