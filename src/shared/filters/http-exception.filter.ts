import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Request,
    NotFoundException,
    BadRequestException,
    Logger,
    ConflictException
} from "@nestjs/common";
import { ApiResponseDto } from "../dtos/api-responses/api-response.dto";
import { InternalServerErrorResponse } from "src/shared/dtos/api-responses/errors/internal-server-error-response.dto";
import { BadRequestResponse } from "src/shared/dtos/api-responses/errors/bad-request-error-response.dto";
import { ConflictResponse } from "../dtos/api-responses/errors/conflict-error-response.dto";

/**
 * Filtro global para capturar y normalizar todas las excepciones que ocurren en la aplicación.
 *
 * Este filtro intercepta cualquier excepción no manejada y transforma la respuesta HTTP
 * en un formato estándar definido por los DTOs de respuesta, facilitando la gestión y
 * el control de errores en el cliente.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly AllExceptionsFilterLogger = new Logger(
        AllExceptionsFilter.name
    );

    /**
     * Método encargado de capturar la excepción, registrar información de error en consola
     * y enviar una respuesta HTTP normalizada al cliente.
     *
     * @param exception Objeto de la excepción lanzada.
     * @param host Contexto de ejecución que contiene la petición y respuesta HTTP.
     */
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse();

        this.AllExceptionsFilterLogger.error(
            `ERROR ${request.url}, exception: `,
            JSON.stringify(exception)
        );

        if (exception instanceof ApiResponseDto)
            response.status(exception.status).json(exception);
        else if (exception instanceof BadRequestException)
            response
                .status(exception?.getStatus())
                .json(new BadRequestResponse(exception?.message, null));
        else if (exception instanceof ConflictException)
            response
                .status(exception?.getStatus())
                .json(new ConflictResponse(exception?.message));
        else
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new InternalServerErrorResponse("Internal Error"));
    }
}
