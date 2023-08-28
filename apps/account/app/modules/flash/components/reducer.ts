import { Flash } from '../types';

export type ExtendedFlash = Flash & { state: 'visible' | 'hidden' };

export type State = {
  flashes: ExtendedFlash[];
};

type AddFlash = {
  type: 'ADD_FLASH';
  payload: Flash;
};

type HideFlash = {
  type: 'HIDE_FLASH';
  payload: { id: string };
};

type RemoveFlash = {
  type: 'REMOVE_FLASH';
  payload: { id: string };
};

export type Action = AddFlash | RemoveFlash | HideFlash | { type: 'HIDE_ALL_FLASHES' };

export const initialState = { flashes: [] };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_FLASH':
      return {
        flashes: [...state.flashes, { ...action.payload, state: 'visible' }],
      };

    case 'HIDE_FLASH':
      return {
        flashes: state.flashes.map((flash) => {
          if (flash.id === action.payload.id) {
            return { ...flash, state: 'hidden' };
          }
          return flash;
        }),
      };
    case 'REMOVE_FLASH':
      return {
        flashes: state.flashes.filter((flash) => flash.id !== action.payload.id),
      };

    case 'HIDE_ALL_FLASHES':
      return {
        flashes: state.flashes.map((flash) => {
          return { ...flash, state: 'hidden' };
        }),
      };
    default:
      return state;
  }
}

export const removeFlash = (id: string) => ({
  type: 'REMOVE_FLASH' as const,
  payload: { id },
});

export const addFlash = (flash: Flash) => ({
  type: 'ADD_FLASH' as const,
  payload: flash,
});

export const hideFlash = (id: string) => ({
  type: 'HIDE_FLASH' as const,
  payload: { id },
});

export const hideAllFlashes = () => ({
  type: 'HIDE_ALL_FLASHES' as const,
});
