import { Injectable } from "@nestjs/common";
import { InvoiceDto } from "../../application/dtos/invoice.dto";
import { IInvoiceProcessor } from "../interfaces/invoice-processor.interface";
import { Invoice } from "../entities/invoice.entity";
import { InvoiceLine } from "../entities/invoice-line.entity";
import { ProductCategory } from "../constants/product-category.constant";
import { Account } from "../constants/account.constant";

/**
 * Invoice processor implementation for Company A
 * @class CompanyAInvoiceProcessor
 * @implements {IInvoiceProcessor}
 * @description Processes invoices for Company A with alcohol detection logic
 */
@Injectable()
export class CompanyAInvoiceProcessor implements IInvoiceProcessor {
    /**
     * Processes an invoice for Company A
     * @param {InvoiceDto} invoice - Input invoice data
     * @returns {Invoice} Processed invoice with appropriate account code
     * @description Assigns account "ALC-001" if alcohol items are found, otherwise "STD-001"
     * @example
     * Invoice with alcohol items -> account: "ALC-001"
     * Invoice without alcohol -> account: "STD-001"
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
        if (hadAlcohol) invoice.setAccount(Account.ALC_001);
        else invoice.setAccount(Account.STD_001);

        return invoice;
    }
}
