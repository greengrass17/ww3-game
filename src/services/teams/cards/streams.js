import kefir from 'kefir';

const selectedCard = kefir.pool();

export const selectCard = (card) => selectedCard.plug(kefir.constant(card));

export const onSelectCard = (handler) => {
  selectedCard.onValue(handler);
};

export const offSelectCard = (handler) => {
  selectedCard.offValue(handler);
};
