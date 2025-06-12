import { DateUtils } from "../date.utils";

describe("DateUtils", () => {
    describe("getZeroHourForCurrentDate", () => {
        it("should return yesterday's date with time set to 00:00:00.000", () => {
            // Arrange
            const expected = new Date();
            expected.setDate(expected.getDate() - 1);
            expected.setHours(0, 0, 0, 0);

            // Act
            const result = DateUtils.getZeroHourForCurrentDate();

            // Assert
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("getLastHourForCurrentDate", () => {
        it("should return yesterday's date with time set to 23:59:59.999", () => {
            // Arrange
            const expected = new Date();
            expected.setDate(expected.getDate() - 1);
            expected.setHours(23, 59, 59, 999);

            // Act
            const result = DateUtils.getLastHourForCurrentDate();

            // Assert
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("getDaysAgo", () => {
        it("should return date from specified number of days ago", () => {
            // Arrange
            const daysToSubtract = 3;
            const expected = new Date();
            expected.setDate(expected.getDate() - daysToSubtract);

            // Act
            const result = DateUtils.getDaysAgo(daysToSubtract);

            // Assert
            expect(result.toDateString()).toBe(expected.toDateString());
        });

        it("should handle zero days correctly", () => {
            // Arrange
            const daysToSubtract = 0;
            const expected = new Date();

            // Act
            const result = DateUtils.getDaysAgo(daysToSubtract);

            // Assert
            expect(result.toDateString()).toBe(expected.toDateString());
        });
    });

    describe("formatShortDate", () => {
        it("should format date in Colombian short format with AM/PM", () => {
            // Arrange
            const date = new Date();
            const expectedPattern = /\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2} (a\. ?m\.|p\. ?m\.)/;

            // Act
            const result = DateUtils.formatShortDate(date);
            const normalized = result.replace(/\u00A0/g, " ");

            // Assert
            expect(normalized).toMatch(expectedPattern);
        });
    });

    describe("formatLongDate", () => {
        it("should format date in Colombian long format with full details", () => {
            // Arrange
            const date = new Date("2024-05-10T14:35:00");
            const expectedPattern = /viernes.*10.*mayo.*2024.*02:35.*p\.\s*m\./i;

            // Act
            const result = DateUtils.formatLongDate(date);

            // Assert
            expect(result).toMatch(expectedPattern);
        });
    });

    describe("formatDateForPostgresBogota", () => {
        it("should format date in PostgreSQL format for Bogota timezone", () => {
            // Arrange
            const date = new Date("2024-05-10T14:35:27");
            const expected = "2024-05-10 14:35:27";

            // Act
            const result = DateUtils.formatDateForPostgresBogota(date);

            // Assert
            expect(result).toBe(expected);
        });

        it("should handle single digit values correctly", () => {
            // Arrange
            const date = new Date("2024-01-01T01:01:01");
            const expected = "2024-01-01 01:01:01";

            // Act
            const result = DateUtils.formatDateForPostgresBogota(date);

            // Assert
            expect(result).toBe(expected);
        });
    });
});
