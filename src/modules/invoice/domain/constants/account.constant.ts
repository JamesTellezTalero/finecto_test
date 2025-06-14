export const Account = {
    ALC_001: "ALC-001",
    STD_001: "STD-001",
    MULTI_B: "MULTI-B",
    ALC_B: "ALC-B",
    TOB_B: "TOB-B",
    STD_B: "STD-B"
} as const;

export type Account = (typeof Account)[keyof typeof Account];
