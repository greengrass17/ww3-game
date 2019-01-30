import kefir from 'kefir';
import enums from 'services/enums';

export const mapClickStream = kefir.pool();

const modePool = kefir.pool();
export const modeStream = modePool.toProperty(() => enums['mode.select']);

export const addClick = (props, map, event) => {
  mapClickStream.plug(kefir.constant({
    props,
    map,
    event
  }));
};

export const onClick = (handler) => {
  mapClickStream.onValue(handler);
};

export const changeMode = (mode) => {
  if (!enums[`mode.${mode}`]) {
    console.error('Invalid mode');
    throw mode;
  }
  modePool.plug(kefir.constant(enums[`mode.${mode}`]));
};

const rulerModeStream = modeStream
  .map(mode => mode === enums['mode.ruler']);

export const rulerModeClickStrream = mapClickStream.filterBy(rulerModeStream);

const selectModeStream = modeStream
  .map(mode => mode === enums['mode.select']);

export const selectModeClickStream = mapClickStream.filterBy(selectModeStream);