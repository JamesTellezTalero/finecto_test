import { ValidationError } from "class-validator";
import { mapperErrorsUtils } from "../mapper-errors.utils";

describe("mapperErrorsUtils", () => {
    it("should map simple validation errors correctly", () => {
        const errors: ValidationError[] = [
            {
                property: "email",
                value: "invalid-email",
                constraints: {
                    isEmail: "email must be an email"
                },
                children: []
            }
        ];

        const result = mapperErrorsUtils(errors);

        expect(result).toEqual([
            {
                item: "email",
                previousValue: "invalid-email",
                message: "email must be an email"
            }
        ]);
    });

    it("should map nested validation errors", () => {
        const errors: ValidationError[] = [
            {
                property: "user",
                value: {},
                children: [
                    {
                        property: "name",
                        value: "",
                        constraints: {
                            isNotEmpty: "name should not be empty"
                        },
                        children: []
                    }
                ],
                constraints: undefined
            }
        ];

        const result = mapperErrorsUtils(errors);

        expect(result).toEqual([
            {
                item: "user.name",
                previousValue: "",
                message: "name should not be empty"
            }
        ]);
    });

    it("should include index if provided", () => {
        const errors: ValidationError[] = [
            {
                property: "name",
                value: "123",
                constraints: {
                    isString: "name must be a string"
                },
                children: []
            }
        ];

        const result = mapperErrorsUtils(errors, "", 2);

        expect(result).toEqual([
            {
                item: "name at index [2]",
                previousValue: "123",
                message: "name must be a string"
            }
        ]);
    });
});
