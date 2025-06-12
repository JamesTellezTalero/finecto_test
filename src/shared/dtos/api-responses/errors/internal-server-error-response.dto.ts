import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Represents an API response for internal server errors (HTTP status code 500).
 *
 * This class is used when an unexpected error occurs on the server side.
 */
export class InternalServerErrorResponse extends ApiResponseDto<void, void> {
    /**
     * Creates a new instance of `InternalServerErrorResponse`.
     *
     * @param message - A human-readable message describing the internal error.
     *
     * @example
     * throw new InternalServerErrorResponse("Unexpected server error occurred");
     */
    constructor(message: string) {
        // Uses the parent class's protected method to create the response instance
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}
