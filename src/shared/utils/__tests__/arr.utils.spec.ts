import { ArrUtils } from "../arr.utils";

describe("ArrUtils", () => {
    describe("hasUniqueNumbers", () => {
        it("should return true when array contains only unique numbers", () => {
            // Arrange
            const uniqueNumbers = [1, 2, 3, 4, 5];

            // Act
            const result = ArrUtils.hasUniqueNumbers(uniqueNumbers);

            // Assert
            expect(result).toBe(true);
        });

        it("should return false when array contains duplicate numbers", () => {
            // Arrange
            const numbersWithDuplicates = [1, 2, 2, 3];

            // Act
            const result = ArrUtils.hasUniqueNumbers(numbersWithDuplicates);

            // Assert
            expect(result).toBe(false);
        });

        it("should return true when array is empty", () => {
            // Arrange
            const emptyArray: number[] = [];

            // Act
            const result = ArrUtils.hasUniqueNumbers(emptyArray);

            // Assert
            expect(result).toBe(true);
        });

        it("should return true when array contains single number", () => {
            // Arrange
            const singleNumberArray = [42];

            // Act
            const result = ArrUtils.hasUniqueNumbers(singleNumberArray);

            // Assert
            expect(result).toBe(true);
        });

        it("should handle array with negative numbers", () => {
            // Arrange
            const numbersWithNegatives = [-1, -2, -1, 3];

            // Act
            const result = ArrUtils.hasUniqueNumbers(numbersWithNegatives);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("hasUniqueStrings", () => {
        it("should return true when array contains only unique strings", () => {
            // Arrange
            const uniqueStrings = ["a", "b", "c"];

            // Act
            const result = ArrUtils.hasUniqueStrings(uniqueStrings);

            // Assert
            expect(result).toBe(true);
        });

        it("should return false when array contains duplicate strings", () => {
            // Arrange
            const stringsWithDuplicates = ["x", "y", "x"];

            // Act
            const result = ArrUtils.hasUniqueStrings(stringsWithDuplicates);

            // Assert
            expect(result).toBe(false);
        });

        it("should be case sensitive when comparing strings", () => {
            // Arrange
            const caseSensitiveStrings = ["a", "A"];

            // Act
            const result = ArrUtils.hasUniqueStrings(caseSensitiveStrings);

            // Assert
            expect(result).toBe(true);
        });

        it("should return true when array is empty", () => {
            // Arrange
            const emptyArray: string[] = [];

            // Act
            const result = ArrUtils.hasUniqueStrings(emptyArray);

            // Assert
            expect(result).toBe(true);
        });

        it("should handle array with special characters", () => {
            // Arrange
            const specialChars = ["@", "#", "@", "$"];

            // Act
            const result = ArrUtils.hasUniqueStrings(specialChars);

            // Assert
            expect(result).toBe(false);
        });
    });
});
