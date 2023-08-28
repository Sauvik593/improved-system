import React from 'react';
import ReactDOM from 'react-dom';
import { CountryList } from './CountryList';
import NextImage from 'next/image';
import { i18n } from 'next-i18next';

import { ChevronDown } from '@kyero/icons';
import { CountryImages } from '@components/common/HeaderImages';
import { Country } from '@lib/types';

interface State {
  open: boolean;
}

interface Props {
  countries: Country[];
  country: Country | null;
}

export class CountrySelectDropdown extends React.Component<Props, State> {
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
          width: 235,
          height: 216,
          zIndex: 99,
        }}
      >
        <CountryList />
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
      <div className="flex items-center" ref={this.elementRef}>
        <button
          aria-haspopup="listbox"
          className="flex items-center gap-2 md:inline-flex md:items-center"
          onClick={this.handleClick}
        >
          <NextImage
            src={CountryImages[this.props.country?.translation_key as string]}
            alt={`general.countries.${this.props.country?.translation_key}.alt`}
            key={this.props.country?.translation_key}
            width={24}
            height={24}
          />
          <span className="text-sierra-night-100 mr-1">
            {i18n?.t(`general.countries.${this.props.country?.translation_key}.title`) as string}
          </span>
          <ChevronDown />
        </button>
        {this.showPopup && this.renderList()}
      </div>
    );
  }
}
