import React from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'next-i18next';

import { LanguageList } from './LanguageList';
import { LanguageContext } from '@contexts/LanguageContext';
import { Globe } from '@images/icons/Globe';
import { Country } from '@lib/types';

interface State {
  open: boolean;
}

interface Props {
  countries: Country[];
}

export class LanguageSwitcher extends React.Component<Props, State> {
  elementRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.elementRef = React.createRef();

    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  renderList = () => {
    if (typeof window === 'undefined') {
      return null;
    }

    const refPosition = this.elementRef.current?.getBoundingClientRect() as DOMRect;

    return ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed',
          top: refPosition?.top + refPosition?.height + 24,
          left: refPosition?.left,
          width: 178,
          height: 216,
          zIndex: 99,
        }}
      >
        <LanguageList />
      </div>,
      this.portalContainer as HTMLElement,
    );
  };

  get portalContainer() {
    if (typeof window === 'undefined') {
      return null;
    }

    return document.getElementById('portals');
  }

  handleClick = () => {
    this.setState((state) => {
      return {
        ...state,
        open: !state.open,
      };
    });
  };

  handleClickOutside = (event: MouseEvent) => {
    const { target } = event;
    const { open } = this.state;
    // eslint-disable-next-line
    // @ts-ignore
    const isInPortal = event.composedPath().find((el: HTMLElement) => el.id === 'portals');
    const clickedOutside =
      this.elementRef && !this.elementRef.current?.contains(target as HTMLElement);

    if (!open || isInPortal) {
      return;
    }

    if (clickedOutside) {
      event.stopPropagation();
      this.setState({
        open: false,
      });
    }
  };

  get showPopup() {
    return this.state.open;
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {(languageProps) => (
          <div className="flex items-center" ref={this.elementRef}>
            <button
              aria-haspopup="listbox"
              className="flex inline-flex items-center items-center gap-2"
              onClick={this.handleClick}
            >
              <Globe />
              <span className="text-sierra-night-100">
                {/* eslint-disable-next-line */}
                {/* @ts-ignore */}
                {i18n?.t(`menu.language_switcher.${languageProps.locale}`)}
              </span>
            </button>
            {this.showPopup && this.renderList()}
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}
