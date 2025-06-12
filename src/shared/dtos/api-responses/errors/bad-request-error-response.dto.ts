import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Represents an API response for malformed request bodies (HTTP status code 400).
 *
 * This class is used to standardize error responses when the client sends a bad request.
 * It extends the generic `ApiResponseDto` with a `void` data type and a customizable error type.
 *
 * @template Error - The type of the error details to be included in the response.
 */
export class BadRequestResponse<Error> extends ApiResponseDto<void, Error> {
    /**
     * Creates a new instance of `BadRequestResponse`.
     *
     * @param message - A human-readable message describing the error.
     * @param error - Optional detailed error object.
     *
     * @example
     * throw new BadRequestResponse("Missing required fields", { field: "email" });
     */
    constructor(message: string, error?: Error) {
        // Uses the parent class's protected method to create the response instance
        super(HttpStatus.BAD_REQUEST, message, null, error);
    }
}
