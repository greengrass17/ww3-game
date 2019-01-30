import kefir from 'kefir';

const modalPool = kefir.pool();

export const onValue = (handler) => {
  modalPool.onValue(handler);
};

export const offValue = (handler) => {
  modalPool.offValue(handler);
};

export const addModal = ({ isOpen, title, content, actions }) => {
  modalPool.plug(kefir.constant({
    isOpen,
    title,
    content,
    actions
  }));
};