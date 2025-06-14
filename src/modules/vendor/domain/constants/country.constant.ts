export const Country = {
    COUNTRY_US: "US"
} as const;

export type Country = (typeof Country)[keyof typeof Country];
