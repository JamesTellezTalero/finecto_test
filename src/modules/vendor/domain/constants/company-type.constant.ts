export const CompanyType = {
    COMPANY_A: "A",
    COMPANY_B: "B"
} as const;

export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType];
