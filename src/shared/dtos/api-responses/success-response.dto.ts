import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "./api-response.dto";

/**
 * Represents a successful API response (HTTP status code 200).
 *
 * This class is used to return data and a success message to the client.
 *
 * @template Item - The type of data returned in the response.
 * @template Error - The type of error (unused in success but kept for consistency with the base DTO).
 */
export class SuccessResponse<Item, Error> extends ApiResponseDto<Item, Error> {
    /**
     * Creates a new instance of `SuccessResponse`.
     *
     * @param message - A human-readable message describing the success.
     * @param item - Optional data to return in the response.
     *
     * @example
     * return new SuccessResponse("User created successfully", createdUser);
     */
    constructor(message: string, item?: Item) {
        // Uses the parent class's protected method to create the response instance
        super(HttpStatus.OK, message, item, null);
    }
}
