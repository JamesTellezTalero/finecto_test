import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { VendorModule } from "./modules/vendor/vendor.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./shared/filters/http-exception.filter";
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
    imports: [VendorModule, InvoiceModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        }
    ]
})
export class AppModule {}
