import { createContext, useContext, type Context, useReducer } from 'react';

type ModalID =
  | 'cookie-bar'
  | 'cookie-modal'
  | 'language-switcher'
  | 'mobile-menu'
  | 'auth-desktop'
  | 'auth-mobile';

interface AuthPayload {
  type: 'login' | 'signup';
}

type Payload = AuthPayload | { [key: string]: any };

type ModalState =
  | {
      id: ModalID;
      isOpen: boolean;
      payload: undefined;
    }
  | {
      id: 'auth-desktop' | 'auth-mobile';
      isOpen: boolean;
      payload: AuthPayload;
    };

interface ModalsState {
  priority: ModalID[];
  modals: {
    [key in ModalID]: ModalState;
  };
}

export interface ModalsContextProps {
  openModal: (id: ModalID, payload?: Payload) => void;
  closeModal: (id: ModalID) => void;
  checkOpenModal: (id: ModalID) => boolean;
  getModalZIndex: (id: ModalID) => number;
  getModalState: (id: ModalID) => ModalState;
  isMoreImportantModalOpen: (id: ModalID) => boolean;
  closeModalWithParents: (id: ModalID) => void;
}

const INITIAL_STATE: ModalsState = {
  // first element is the most important
  priority: [
    'cookie-bar',
    'cookie-modal',
    'auth-mobile',
    'language-switcher',
    'auth-desktop',
    'mobile-menu',
  ],
  modals: {
    'cookie-bar': {
      id: 'cookie-bar',
      isOpen: false,
      payload: undefined,
    },
    'cookie-modal': {
      id: 'cookie-modal',
      isOpen: false,
      payload: undefined,
    },
    'language-switcher': {
      id: 'language-switcher',
      isOpen: false,
      payload: undefined,
    },
    'mobile-menu': {
      id: 'mobile-menu',
      isOpen: false,
      payload: undefined,
    },
    'auth-desktop': {
      id: 'auth-desktop',
      isOpen: false,
      payload: {
        type: 'login',
      },
    },
    'auth-mobile': {
      id: 'auth-mobile',
      isOpen: false,
      payload: {
        type: 'login',
      },
    },
  },
};

export const ModalsContext = createContext<ModalsContextProps | null>(null);

const REDUCER = (
  state: ModalsState,
  action: { type: string; payload: { id: ModalID; payload?: Payload } },
) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.id]: {
            ...state.modals[action.payload.id],
            payload: action.payload.payload,
            isOpen: true,
          },
        },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload.id]: {
            ...state.modals[action.payload.id],
            isOpen: false,
          },
        },
      };
    default:
      return state;
  }
};

const MAX_Z_INDEX = 99999;
const CLOSE_DELAY = 50;

export const ModalsContextProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(REDUCER, INITIAL_STATE);

  const isMoreImportantModalOpen = (id: ModalID) => {
    const modalIndex = state.priority.indexOf(id);
    const modalPriority = state.priority.slice(0, modalIndex);

    return modalPriority.some((modalId) => state.modals[modalId].isOpen);
  };

  const openModal = (id: ModalID, payload?: Payload) => {
    dispatch({ type: 'OPEN_MODAL', payload: { id, payload } });
  };

  const closeModal = (id: ModalID, payload?: Payload) => {
    if (isMoreImportantModalOpen(id)) return;
    dispatch({ type: 'CLOSE_MODAL', payload: { id, payload } });
  };

  const closeModalWithParents = (id: ModalID, payload?: Payload) => {
    const modalIndex = state.priority.indexOf(id);
    const modalPriority = state.priority.slice(modalIndex);

    modalPriority.forEach((modalId, index) => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          dispatch({ type: 'CLOSE_MODAL', payload: { id: modalId, payload } });
        }, CLOSE_DELAY * index);
      });
    });
  };

  const getModalState = (id: ModalID) => state.modals[id];
  const checkOpenModal = (id: ModalID) => getModalState(id)?.isOpen;
  const getModalZIndex = (id: ModalID) => MAX_Z_INDEX - state.priority.indexOf(id);

  return (
    <ModalsContext.Provider
      value={{
        openModal,
        closeModal,
        checkOpenModal,
        getModalZIndex,
        isMoreImportantModalOpen,
        getModalState,
        closeModalWithParents,
      }}
    >
      {props.children}
    </ModalsContext.Provider>
  );
};

export const useModalsContext = () => useContext(ModalsContext as Context<ModalsContextProps>);
