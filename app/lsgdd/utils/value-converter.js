const StatusToLabelMapping = {
  'Unsold': 'Bought-in'
};
export function labelForStatus(status) {
  return StatusToLabelMapping[status] || status;
}

const ColorMappings = {
  'red':    '#EA1B25',
  'orange': '#FFA650',
  'yellow': '#FAE857',
  'green':  '#00D255',
  'blue':   '#291AED',
  'purple': '#9738AA'
};
const CurrencyMappings = {
  gbp: '£',
  usd: '$',
  eur: '€',
  frf: 'Fr',
  dem: 'DM',
  chf: 'CHF',
  sek: 'kr',
  itl: '₤',
  nlg: 'ƒ',
  aud: 'A$',
  dkk: 'kr.',
  cad: 'C$',
  bef: 'fr.',
  ats: 'öS',
  hkd: 'HK$',
  esp: 'Pta',
  nzd: '$',
  iep: '£',
  cny: '¥',
  nok: 'kr',
  zar: 'R',
  huf: 'Ft',
  fim: 'mk',
  sgd: 'S$',
  pln: 'zł',
  mxn: '$',
  inr: '₹',
  twd: 'NT$',
  brl: 'Ɽ',
  czk: 'Kč',
  jpy: '¥',
  ils: '₪',
  grd: 'GRD',
  idr: 'Rp',
  ars: '$',
  skk: 'Sk',
  mad: 'MAD',
  vef: 'Bs. F',
  veb: 'Bs.',
  ngn: '₦',
  rur: '₽',
  aed: '.إ',
  krw: '₩',
  myr: 'RM',
  sar: 'ريال',
  php: '₱'
};
export function hexForColor(color) {
  return ColorMappings[color] || color;
}
export function symbolForISO(isoCurrency) {
  const currency = isoCurrency && isoCurrency.toLowerCase();
  if (CurrencyMappings.hasOwnProperty(currency)) {
    return CurrencyMappings[currency];
  } else {
    return isoCurrency;
  }
}
const CategoryToResultTemplateMapping = {
  'Pictures, Drawings and Prints': 'auction-search-result/picture',
  'Jewelry': 'auction-search-result/jewelry',
  'Watches': 'auction-search-result/watch',
  'Wine & Spirits': 'auction-search-result/wine',
  'Furniture and Decorative Arts': 'auction-search-result/furniture',
  'Transportation': 'auction-search-result/transportation',
  '': 'auction-search-result/unknown'
};

const CategoryToLotTemplateMapping = {
  'Pictures, Drawings and Prints': 'lot-description/picture',
  'Jewelry': 'lot-description/jewelry',
  'Watches': 'lot-description/watch',
  'Wine & Spirits': 'lot-description/wine',
  'Furniture and Decorative Arts': 'lot-description/furniture',
  'Transportation': 'lot-description/transportation',
  '': 'lot-description/unknown'
};

export function resultComponentForCategory(category) {
  return CategoryToResultTemplateMapping[category];
}

export function lotDescriptionForCategory(category) {
  return CategoryToLotTemplateMapping[category];
}
