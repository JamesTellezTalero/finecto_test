import { Injectable } from "@nestjs/common";
import { InvoiceDto } from "../../application/dtos/invoice.dto";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";
import { Invoice } from "../entities/invoice.entity";
import { InvoiceLine } from "../entities/invoice-line.entity";
import { ProductCategory } from "../constants/product-category.constant";
import { Account } from "../constants/account.constant";

/**
 * Invoice processor implementation for Company B
 * @class CompanyBInvoiceProcessor
 * @implements {IInvoiceProcessor}
 * @description Processes invoices for Company B with alcohol and tobacco detection logic
 */
@Injectable()
export class CompanyBInvoiceProcessor implements IInvoiceProcessor {
    /**
     * Processes an invoice for Company B
     * @param {InvoiceDto} invoice - Input invoice data
     * @returns {Invoice} Processed invoice with appropriate account code
     * @description Assigns account codes based on product categories:
     * - "MULTI-B": Both alcohol and tobacco items
     * - "ALC-B": Only alcohol items
     * - "TOB-B": Only tobacco items
     * - "STD-B": Neither alcohol nor tobacco
     * @example
     * - Invoice with both alcohol and tobacco -> account: "MULTI-B"
     * - Invoice with only alcohol -> account: "ALC-B"
     * - Invoice with only tobacco -> account: "TOB-B"
     * - Regular invoice -> account: "STD-B"
     */
    processInvoice(invoiceDto: InvoiceDto): Invoice {
        const invoice = new Invoice(
            invoiceDto.invoiceId,
            invoiceDto.invoiceDate,
            invoiceDto.lines.map(
                (line) =>
                    new InvoiceLine(line.description.toUpperCase(), line.amount)
            )
        );

        const ProductCategories = invoice.getProductCategories();
        const hadAlcohol = ProductCategories.some(
            (category) => category == ProductCategory.ALCOHOL
        );
        const hadTobacco = ProductCategories.some(
            (category) => category == ProductCategory.TOBACCO
        );
        if (hadAlcohol && hadTobacco) invoice.setAccount(Account.MULTI_B);
        else if (hadTobacco) invoice.setAccount(Account.TOB_B);
        else if (hadAlcohol) invoice.setAccount(Account.ALC_B);
        else invoice.setAccount(Account.STD_B);

        return invoice;
    }
}
