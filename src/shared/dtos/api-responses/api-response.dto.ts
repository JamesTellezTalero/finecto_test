import { ApiProperty } from "@nestjs/swagger";

/**
 * Generic API response wrapper for successful or failed HTTP responses.
 *
 * This DTO is used as a base class for structured API responses,
 * including HTTP status, message, optional data, and error information.
 *
 * @template Item - The type of the data returned in a successful response.
 * @template Error - The type of the error information included in a failed response.
 */
export class ApiResponseDto<Item, Error> {
    /**
     * HTTP status code of the response.
     */
    @ApiProperty({ description: "HTTP Response Status" })
    status: number;

    /**
     * A descriptive message about the result of the request.
     */
    @ApiProperty({ description: "HTTP Response Message" })
    message: string;

    /**
     * The payload or result returned from the API (if applicable).
     */
    @ApiProperty({ description: "HTTP Response Item" })
    item: Item;

    /**
     * Additional error details (if applicable).
     */
    @ApiProperty({ description: "HTTP Response Error" })
    errors: Error;

    /**
     * Constructs a new `ApiResponseDto` instance.
     * This constructor is protected to encourage the use of specific response types (e.g., `SuccessResponse`, `BadRequestResponse`).
     *
     * @param status - HTTP status code.
     * @param message - Message describing the response.
     * @param item - Optional data to return in the response.
     * @param errors - Optional error details.
     */
    protected constructor(
        status: number,
        message: string,
        item?: Item,
        errors?: Error
    ) {
        this.status = status;
        this.message =
            status === 500
                ? "We encountered an unexpected issue on our server. Please try again later, and if the problem persists, contact our support team."
                : message;
        this.item = status === 500 || item == null ? null : item;
        this.errors = status !== 200 || errors != null ? errors : null;
    }

    /**
     * Factory method to create a new `ApiResponseDto`.
     * Can be used internally or by child classes to simplify response creation.
     *
     * @param status - HTTP status code.
     * @param message - Response message.
     * @param item - Optional data.
     * @param errors - Optional error details.
     * @returns A new `ApiResponseDto` instance.
     */
    protected static createResponse<Item, Error>(
        status: number,
        message: string,
        item?: Item,
        errors?: Error
    ): ApiResponseDto<Item, Error> {
        return new ApiResponseDto(status, message, item, errors);
    }
}
