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
 * Global exception filter that captures and standardizes all unhandled exceptions
 * in the application.
 *
 * This filter intercepts any thrown exception and transforms it into a consistent
 * response format using standardized API response DTOs.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    /**
     * Handles the caught exception by logging it and sending a standardized HTTP response.
     *
     * @param exception - The thrown exception object.
     * @param host - Provides access to the request and response objects.
     */
    catch(exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse();

        this.logger.error(
            `ERROR at ${request.url} - Exception: `,
            JSON.stringify(exception)
        );

        if (exception instanceof ApiResponseDto)
            response.status(exception.status).json(exception);
        else if (exception instanceof BadRequestException)
            response
                .status(exception.getStatus())
                .json(new BadRequestResponse(exception.message, null));
        else if (exception instanceof ConflictException)
            response
                .status(exception.getStatus())
                .json(new ConflictResponse(exception.message));
        else
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new InternalServerErrorResponse("Internal Error"));
    }
}
