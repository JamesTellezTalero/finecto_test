export const ProductCategory = {
    ALCOHOL: "ALCOHOL",
    TOBACCO: "TOBACCO",
    STANDARD: "STANDARD"
} as const;

export type ProductCategory =
    (typeof ProductCategory)[keyof typeof ProductCategory];
