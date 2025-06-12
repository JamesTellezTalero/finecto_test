import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Asegúrate de que el puerto sea un número

    const config = new DocumentBuilder()
        .setTitle("API FINECTO")
        .setDescription("Documentación de la API FINECTO")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT ?? 3000, () =>
        console.log(`Running on http://localhost:${process.env.PORT ?? 3000}`)
    );
}
bootstrap();
