import kefir from 'kefir';

const selectedCountry = kefir.pool();

export const selectCountry = (country) => selectedCountry.plug(kefir.constant(country));

export const onSelectCountry = (handler) => {
  selectedCountry.onValue(handler);
};

export const offSelectCountry = (handler) => {
  selectedCountry.offValue(handler);
};
