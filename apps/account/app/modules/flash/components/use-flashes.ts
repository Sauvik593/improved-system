import { RootLoaderData } from '~/root';

import { useMatches, useLocation, useTransition } from '@remix-run/react';
import { useMemo, useEffect, useReducer } from 'react';
import {
  reducer,
  initialState,
  addFlash,
  hideAllFlashes,
  hideFlash,
  removeFlash,
} from '~/modules/flash/components/reducer';
import { Flash } from '../types';

export const useFlashMessage = () => {
  const matches = useMatches();
  const flash = useMemo(() => {
    const rootLoader = matches.find((route) => route.id === 'root');
    const loaderData = rootLoader?.data as RootLoaderData;

    if (!loaderData) {
      return null;
    }

    return loaderData.flash;
  }, [matches]);

  return { flash };
};

export const useFlashes = () => {
  const [{ flashes }, dispatch] = useReducer(reducer, initialState);
  const { flash } = useFlashMessage();
  const { location } = useTransition();
  const { pathname } = useLocation();

  const fireHideFlash = (id: string) => dispatch(hideFlash(id));
  const fireRemoveFlash = (id: string) => dispatch(removeFlash(id));
  const fireAddFlash = (flash: Flash) => dispatch(addFlash(flash));
  const fireHideAllFlashes = () => dispatch(hideAllFlashes());

  const findFlash = (id: string) =>
    flashes.find((currentFlash) => {
      currentFlash.id === id;
    });

  // Remove flash on route change
  useEffect(() => {
    if (location && location?.pathname !== pathname) {
      fireHideAllFlashes();
    }
  }, [location, pathname]);

  // Avoid adding duplicated flash
  useEffect(() => {
    if (!flash) {
      return;
    }
    const duplicatedFlash = findFlash(flash.id);

    if (!duplicatedFlash) {
      fireAddFlash(flash);
    }
  }, [flash]);

  return {
    flashes,
    fireHideAllFlashes,
    fireHideFlash,
    fireRemoveFlash,
    fireAddFlash,
  };
};
