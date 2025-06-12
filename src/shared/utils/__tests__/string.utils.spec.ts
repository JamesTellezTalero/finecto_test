import { StringUtils } from "../string.utils";

describe("StringUtils", () => {
    describe("generateRandomString", () => {
        describe("length validation", () => {
            it("should generate string with exact specified length", () => {
                // Arrange
                const expectedLength = 12;
                const options = { letters: true };

                // Act
                const result = StringUtils.generateRandomString(expectedLength, options);

                // Assert
                expect(result).toHaveLength(expectedLength);
            });

            it("should use default length when not specified", () => {
                // Arrange
                const options = { letters: true };

                // Act
                const result = StringUtils.generateRandomString(undefined, options);

                // Assert
                expect(result).toHaveLength(10);
            });

            it("should throw error when length is not a number", () => {
                // Arrange
                const invalidLength = "10" as any;
                const options = { letters: true };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(invalidLength, options);
                }).toThrow("La longitud debe ser un número.");
            });

            it("should throw error when length is negative", () => {
                // Arrange
                const invalidLength = -1;
                const options = { letters: true };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(invalidLength, options);
                }).toThrow(`La longitud debe estar entre 1 y ${Number.MAX_SAFE_INTEGER}`);
            });

            it("should throw error when length is zero", () => {
                // Arrange
                const invalidLength = 0;
                const options = { letters: true };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(invalidLength, options);
                }).toThrow(`La longitud debe estar entre 1 y ${Number.MAX_SAFE_INTEGER}`);
            });

            it("should throw error when length is not an integer", () => {
                // Arrange
                const invalidLength = 5.5;
                const options = { letters: true };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(invalidLength, options);
                }).toThrow("La longitud debe ser un número entero.");
            });

            it("should throw error when length exceeds MAX_SAFE_INTEGER", () => {
                // Arrange
                const invalidLength = Number.MAX_SAFE_INTEGER + 1;
                const options = { letters: true };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(invalidLength, options);
                }).toThrow(`La longitud debe estar entre 1 y ${Number.MAX_SAFE_INTEGER}.`);
            });
        });

        describe("options validation", () => {
            it("should throw error when letters option is not boolean", () => {
                // Arrange
                const length = 10;
                const options = { letters: "true" as any };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(length, options);
                }).toThrow("La opción 'letters' debe ser un booleano.");
            });

            it("should throw error when numbers option is not boolean", () => {
                // Arrange
                const length = 10;
                const options = { numbers: 1 as any };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(length, options);
                }).toThrow("La opción 'numbers' debe ser un booleano.");
            });

            it("should throw error when specialChars option is not boolean", () => {
                // Arrange
                const length = 10;
                const options = { specialChars: [] as any };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(length, options);
                }).toThrow("La opción 'specialChars' debe ser un booleano.");
            });
        });

        describe("character type options", () => {
            it("should generate string with only letters when letters option is true", () => {
                // Arrange
                const length = 20;
                const options = { letters: true };
                const letterPattern = /^[A-Za-z]+$/;

                // Act
                const result = StringUtils.generateRandomString(length, options);

                // Assert
                expect(result).toMatch(letterPattern);
            });

            it("should generate string with only numbers when numbers option is true", () => {
                // Arrange
                const length = 20;
                const options = { numbers: true };
                const numberPattern = /^[0-9]+$/;

                // Act
                const result = StringUtils.generateRandomString(length, options);

                // Assert
                expect(result).toMatch(numberPattern);
            });

            it("should generate string with only special characters when specialChars option is true", () => {
                // Arrange
                const length = 20;
                const options = { specialChars: true };
                const specialCharsPattern = /^[!@#$%^&*()_+\[\]{}|;:,.<>?]+$/;

                // Act
                const result = StringUtils.generateRandomString(length, options);

                // Assert
                expect(result).toMatch(specialCharsPattern);
            });
        });

        describe("multiple character types", () => {
            it("should generate string containing all selected character types", () => {
                // Arrange
                const length = 50;
                const options = {
                    letters: true,
                    numbers: true,
                    specialChars: true
                };

                // Act
                const result = StringUtils.generateRandomString(length, options);

                // Assert
                expect(result).toMatch(/[A-Za-z]/); // Contains letters
                expect(result).toMatch(/[0-9]/); // Contains numbers
                expect(result).toMatch(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/); // Contains special chars
            });

            it("should maintain character type distribution when multiple options are selected", () => {
                // Arrange
                const length = 100;
                const options = {
                    letters: true,
                    numbers: true,
                    specialChars: true
                };

                // Act
                const result = StringUtils.generateRandomString(length, options);

                // Assert
                const letterCount = (result.match(/[A-Za-z]/g) || []).length;
                const numberCount = (result.match(/[0-9]/g) || []).length;
                const specialCharCount = (result.match(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/g) || []).length;

                expect(letterCount).toBeGreaterThan(0);
                expect(numberCount).toBeGreaterThan(0);
                expect(specialCharCount).toBeGreaterThan(0);
                expect(letterCount + numberCount + specialCharCount).toBe(length);
            });
        });

        describe("error handling", () => {
            it("should throw error when no character type is selected", () => {
                // Arrange
                const length = 10;
                const options = {};

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(length, options);
                }).toThrow("Debe seleccionar al menos un tipo de carácter.");
            });

            it("should throw error when all options are false", () => {
                // Arrange
                const length = 10;
                const options = {
                    letters: false,
                    numbers: false,
                    specialChars: false
                };

                // Act & Assert
                expect(() => {
                    StringUtils.generateRandomString(length, options);
                }).toThrow("Debe seleccionar al menos un tipo de carácter.");
            });
        });

        describe("deterministic behavior", () => {
            it("should generate different strings on multiple calls", () => {
                // Arrange
                const length = 10;
                const options = { letters: true, numbers: true };

                // Act
                const result1 = StringUtils.generateRandomString(length, options);
                const result2 = StringUtils.generateRandomString(length, options);

                // Assert
                expect(result1).not.toBe(result2);
            });

            it("should maintain consistent character set for same options", () => {
                // Arrange
                const length = 1000;
                const options = { letters: true, numbers: true };
                const validChars = /^[A-Za-z0-9]+$/;

                // Act
                const result = StringUtils.generateRandomString(length, options);

                // Assert
                expect(result).toMatch(validChars);
                expect(result.length).toBe(length);
            });
        });

        describe("cryptographic randomness", () => {
            it("should generate cryptographically secure random strings", () => {
                // Arrange
                const length = 1000;
                const options = { letters: true, numbers: true };
                const results = new Set<string>();

                // Act
                for (let i = 0; i < 100; i++) {
                    results.add(StringUtils.generateRandomString(length, options));
                }

                // Assert
                expect(results.size).toBe(100); // All strings should be unique
            });
        });
    });
});
