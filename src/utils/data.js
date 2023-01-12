export const AgentsType = [
  {
    name: 'SSIAP 1',
    value: 1,
    width: 28,
  },
  {
    name: 'SSIAP 2',
    value: 2,
    width: 28,
  },
  {
    name: 'SSIAP 3',
    value: 3,
    width: 28,
  },
  {
    name: 'ADS',
    value: 4,
    width: 28,
  },
  {
    name: 'Bodyguard (no weapon)',
    value: 5,
    width: 50,
  },
  {
    name: 'Dog Handler',
    value: 6,
    width: 40,
  },
  {
    name: 'Hostess',
    value: 7,
    width: 28,
  },
];

export const AgentsTypeArray = [
  {
    name: 'SSIAP 1',
    value: '1',
    width: 28,
    key: 0,
  },
  {
    name: 'SSIAP 2',
    value: '2',
    width: 28,
    key: 1,
  },
  {
    name: 'SSIAP 3',
    value: '3',
    width: 28,
    key: 2,
  },
  {
    name: 'ADS',
    value: '4',
    width: 28,
    key: 3,
  },
  {
    name: 'Bodyguard (no weapon)',
    value: '5',
    width: 50,
    key: 4,
  },
  {
    name: 'Dog Handler',
    value: '6',
    width: 40,
    key: 5,
  },
  {
    name: 'Hostess',
    value: '7',
    width: 40,
    key: 6,
  },
];

export const checkValue = (activeIds) => {
  const d = activeIds.replace(/^"(.*)"$/, '$1');
  const e = d.split(',');
  const newData = AgentsTypeArray.filter((item) => {
    return e.indexOf(item.value) > -1;
  });
  return newData;
};

export const AgentType = (type) => {
  switch (type) {
    case 1:
      return 'SSIAP 1';

    case 2:
      return 'SSIAP 2';

    case 3:
      return 'SSIAP 3';

    case 4:
      return 'ADS';

    case 5:
      return 'Bodyguard (no weapon)';

    case 6:
      return 'Dog Handler';

    case 7:
      return 'Hostess';

    case 8:
      return 'Not Sure';
    default:
      return 'Not Sure';
  }
};

export const MissionType = (type) => {
  switch (type) {
    case 'Guard_service':
      return 'Guard Service';

    case 'Intervention':
      return 'Intervention';

    case 'Security_patrol':
      return 'Security Patrol';
    default:
      return 'Not Sure';
  }
};
export const agentData = [
  {
    longitude: 2.349328,
    latitude: 48.859391,
    type: 'agents',
  },
  {
    longitude: 2.348686,
    latitude: 48.865367,
    type: 'hostess',
  },
  {
    longitude: 2.35322,
    latitude: 48.867425,
    type: 'agents',
  },
  {
    longitude: 2.350382,
    latitude: 48.863672,
    type: 'agents',
  },

  {
    longitude: 2.351805,
    latitude: 48.870109,
    type: 'agents',
  },
  {
    longitude: 2.348908,
    latitude: 48.863082,
    type: 'hostess',
  },
];
export const PaymentStatus = (type) => {
  switch (type) {
    case 0:
      return 'Not Paid';
    case 1:
      return 'Payment confirmed';
    case 2:
      return 'Pending Bank Transfer';
    case 3:
      return 'pending';
    case 4:
      return 'in-progress';
    case 4:
      return 'completed';
  }
};
export const count72 = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
];
export const count24 = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];
