import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import * as sqlstring from "sqlstring";
import { BadRequestResponse } from "../api-responses/errors/bad-request-error-response.dto";
import { mapperErrorsUtils } from "src/shared/utils/mapper-errors.utils";

/**
 * Generic base DTO class for validation and sanitation of input data.
 *
 * This class provides common functionality to:
 * - Sanitize string input using SQL escaping.
 * - Validate class properties using `class-validator`.
 * - Convert plain objects to typed DTO instances.
 *
 * @template T - The type of the DTO extending this base class.
 */
export class BaseDto<T> {
    /**
     * Validates the current DTO instance using class-validator.
     * Automatically sanitizes string and array fields before validation.
     *
     * @throws {BadRequestResponse} If validation fails.
     * @returns The validated instance.
     */
    async validate(): Promise<this> {
        this.sanitize();
        const errors = await validate(this);
        if (errors.length > 0) {
            const errorsMapped = mapperErrorsUtils(errors);
            throw new BadRequestResponse("Incomplete Fields", errorsMapped);
        }
        return this;
    }

    /**
     * Validates the current DTO instance, returning raw validation errors instead of throwing.
     *
     * @returns Either the validated instance or an array of `ValidationError` objects.
     */
    async validateInMass(): Promise<ValidationError[] | this> {
        this.sanitize();
        const errors = await validate(this);
        return errors.length > 0 ? errors : this;
    }

    /**
     * Converts a plain JavaScript object into a validated instance of the DTO.
     *
     * @param body - The raw request body or data object.
     * @returns A validated DTO instance.
     */
    static async FromPlain<T>(this: new () => T, body: any): Promise<T> {
        const dto = plainToInstance(this, body || {}, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true
        });
        await (dto as any).validate();
        return dto;
    }

    /**
     * Converts an array of plain objects into validated DTO instances.
     * Returns an array of validated DTOs or throws if any validation fails.
     *
     * @param bodys - Array of raw objects to transform and validate.
     * @throws {BadRequestResponse} If the input is not an array or contains invalid objects.
     * @returns An array of validated DTO instances.
     */
    static async FromPlainInMass<T>(
        this: new () => T,
        bodys: any[]
    ): Promise<T[]> {
        if (!Array.isArray(bodys) || bodys.length === 0) {
            throw new BadRequestResponse(
                "This endpoint expects an array",
                null
            );
        }

        const bodysPromises = bodys.map(async (body) => {
            const dto = plainToInstance(this, body || {}, {
                excludeExtraneousValues: true
            });
            return await (dto as any).validateInMass();
        });

        const validatedBodys = await Promise.all(bodysPromises);

        const errors = validatedBodys
            .filter((v) => Array.isArray(v))
            .flatMap((v) => v);

        if (errors.length > 0) {
            throw new BadRequestResponse("Incomplete Fields", errors);
        }

        return validatedBodys as T[];
    }

    /**
     * Sanitizes all string and array-of-string properties of the instance
     * using SQL escape to mitigate injection attacks.
     */
    private sanitize(): void {
        for (const key of Object.keys(this)) {
            const value = (this as any)[key];
            if (typeof value === "string") {
                (this as any)[key] = sqlstring.escape(value).slice(1, -1);
            } else if (Array.isArray(value)) {
                (this as any)[key] = value.map((v) =>
                    typeof v === "string" ? sqlstring.escape(v).slice(1, -1) : v
                );
            }
        }
    }
}
