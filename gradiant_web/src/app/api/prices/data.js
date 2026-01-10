export const minPrice = {
  date: '17-02-2024',
  hour: '15-16',
  'is-cheap': true,
  'is-under-avg': true,
  market: 'PVPC',
  price: 67.62,
  units: '€/MWh',
};

export const maxPrice = {
  date: '17-02-2024',
  hour: '19-20',
  'is-cheap': false,
  'is-under-avg': false,
  market: 'PVPC',
  price: 127.83,
  units: '€/MWh',
};

export const cheapest1 = {
  date: '17-02-2024',
  hour: '15-16',
  'is-cheap': true,
  'is-under-avg': true,
  market: 'PVPC',
  price: 67.62,
  units: '€/MWh',
};

export const cheapest2 = {
  date: '17-02-2024',
  hour: '14-15',
  'is-cheap': true,
  'is-under-avg': true,
  market: 'PVPC',
  price: 68.97,
  units: '€/MWh',
};

const cheapests = [cheapest1, cheapest2];

export const getCheapests = (count) => cheapests.slice(0, count);
