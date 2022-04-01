export const formatNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toCapitalize = (x) => {
  return x[0].toUpperCase() + x.substr(1).toLowerCase();
};
