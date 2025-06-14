import { ProductCategory } from "../constants/product-category.constant";
import { InvoiceLine } from "./invoice-line.entity";

export class Invoice {
    constructor(
        public readonly company: string,
        public readonly invoiceId: string,
        public readonly invoiceDate: string,
        public readonly lines: InvoiceLine[]
    ) {}

    hasAlcoholItems(): boolean {
        return this.lines.some((line) => line.containsAlcohol());
    }

    hasTobaccoItems(): boolean {
        return this.lines.some((line) => line.containsTobacco());
    }

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
