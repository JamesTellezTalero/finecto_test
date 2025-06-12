import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "../api-response.dto";

/**
 * Represents an API response for conflict errors (HTTP status code 409).
 *
 * This response is typically returned when a request could not be completed due to a conflict
 * with the current state of the resource (e.g., duplicate entries).
 */
export class ConflictResponse extends ApiResponseDto<void, void> {
    /**
     * Creates a new instance of `ConflictResponse`.
     *
     * @param message - A human-readable message describing the conflict.
     *
     * @example
     * throw new ConflictResponse("Email already registered");
     */
    constructor(message: string) {
        // Uses the parent class's protected method to create the response instance
        super(HttpStatus.CONFLICT, message);
    }
}
