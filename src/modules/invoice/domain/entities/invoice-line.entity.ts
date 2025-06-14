/**
 * Represents a single line item in an invoice.
 * @class InvoiceLine
 */
export class InvoiceLine {
    /**
     * Creates an instance of InvoiceLine.
     * @param {string} description - Description of the product or service.
     * @param {number} amount - Monetary value of the line item.
     */
    constructor(
        public readonly description: string,
        public readonly amount: number
    ) {}

    /**
     * Determines if the line item is related to alcohol.
     * Performs a case-insensitive search in the description.
     * @returns {boolean} True if the description contains "alcohol", otherwise false.
     */
    containsAlcohol(): boolean {
        return this.description.toLowerCase().includes("alcohol");
    }

    /**
     * Determines if the line item is related to tobacco.
     * Performs a case-insensitive search in the description.
     * @returns {boolean} True if the description contains "tobacco", otherwise false.
     */
    containsTobacco(): boolean {
        return this.description.toLowerCase().includes("tobacco");
    }
}
