export class InvoiceLine {
    constructor(
        public readonly description: string,
        public readonly amount: number
    ) {}

    containsAlcohol(): boolean {
        return this.description.toLowerCase().includes("alcohol");
    }

    containsTobacco(): boolean {
        return this.description.toLowerCase().includes("tobacco");
    }
}
