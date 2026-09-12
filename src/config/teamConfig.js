export const TEAM_LEVEL_RULES = {
  1: {
    nextLevel: 2,
    requiredA: 3,
    requiredBC: 5,
    requiredTotal: 8,
  },

  2: {
    nextLevel: 3,
    requiredA: 6,
    requiredBC: 20,
    requiredTotal: 26,
  },

  3: {
    nextLevel: 4,
    requiredA: 15,
    requiredBC: 35,
    requiredTotal: 50,
  },

  4: {
    nextLevel: 5,
    requiredA: 25,
    requiredBC: 70,
    requiredTotal: 95,
  },

  5: {
    nextLevel: 6,
    requiredA: 50,
    requiredBC: 150,
    requiredTotal: 200,
  },

  6: {
    nextLevel: null,
    requiredA: null,
    requiredBC: null,
    requiredTotal: null,
  },
};

export const TEAM_COMMISSION_RATES = {
  1: {
    A: 0,
    B: 0,
    C: 0,
  },

  2: {
    A: 12,
    B: 5,
    C: 2,
  },

  3: {
    A: 13,
    B: 6,
    C: 3,
  },

  4: {
    A: 15,
    B: 7,
    C: 5,
  },

  5: {
    A: 16,
    B: 8,
    C: 7,
  },

  6: {
    A: 18,
    B: 9,
    C: 8,
  },
};

export const TEAM_CONFIG = {
  referralBonusRate: 5,

  maxTeamDepth: 3,

  api: {
    overview: "/api/team",
    members: "/api/team/members",
    income: "/api/team/income",
    referral: "/api/team/referral",
  },
};