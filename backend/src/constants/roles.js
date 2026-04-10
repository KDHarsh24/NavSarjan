export const ROLES = {
    STARTUP: "startup",
    INVESTOR: "investor",
    POLICY_MAKER: "policy-maker",
    ADMIN: "admin",
};

export const ALL_ROLES = Object.values(ROLES);
export const PUBLIC_REGISTRATION_ROLES = [
    ROLES.STARTUP,
    ROLES.INVESTOR,
    ROLES.POLICY_MAKER,
];

export const normalizeRole = (role) => String(role || "").trim().toLowerCase();