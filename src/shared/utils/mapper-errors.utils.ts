import { ApiProperty } from "@nestjs/swagger";
import { ValidationError } from "class-validator";

/**
 * Represents a structured validation error, useful for API responses.
 */
export class MappedError {
    @ApiProperty({ description: "Field that contains the error." })
    item: string;

    @ApiProperty({ description: "Value that was submitted." })
    previousValue: string;

    @ApiProperty({ description: "Validation error message." })
    message: string;
}

/**
 * Transforms a list of ValidationError objects into a standardized array of MappedError.
 *
 * Useful for creating user-friendly error responses with detailed field-level context.
 *
 * @param errors - The list of validation errors from class-validator.
 * @param parentPath - Path used for nested properties.
 * @param index - Optional index for identifying items in an array.
 * @returns An array of formatted validation errors.
 */
export const mapperErrorsUtils = (
    errors: ValidationError[],
    parentPath: string = "",
    index?: number
): MappedError[] => {
    const mapErrors = (
        errors: ValidationError[],
        parentPath: string
    ): MappedError[] => {
        return errors.reduce((acc: MappedError[], error) => {
            const path = parentPath
                ? `${parentPath}.${error.property}`
                : error.property;

            if (error.constraints) {
                acc.push({
                    item: index != null ? `${path} at index [${index}]` : path,
                    previousValue: error.value ? error.value.toString() : "",
                    message: Object.values(error.constraints).join(", ")
                });
            }

            if (error.children && error.children.length > 0) {
                const childPath = path;
                acc.push(...mapErrors(error.children, childPath));
            }

            return acc;
        }, []);
    };

    return mapErrors(errors, parentPath);
};
