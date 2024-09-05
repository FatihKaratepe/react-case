import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import './CustomSelect.css';

interface CustomSelectProps {
  prefixIcon?: React.ReactNode | React.ReactElement;
  options: any[];
  selectedIcon?: React.ReactNode | React.ReactElement;
  filter?: boolean;
  sorting?: {
    sortKey: string,
    sortType: 'asc' | 'desc'
  };
  disabled?: boolean;
  multiple?: boolean;
  bindLabel?: string;
  bindValue?: string;
  placeHolder?: string;
  notFoundText?: string;
  closeOnSelect?: boolean;
  onChange: (option: any) => void;
}

const ArrowIcon = ({ color = '#667085', width = 20, height = 20 }: { color?: string, width?: number, height?: number }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke={color} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const NotFound = ({ text }: { text?: string }) => {
  return (
    <div className="customSelectNotFoundContainer">
      <div className="notFoundText">
        {text}
      </div>
      <div className="notFoundIcon">
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 424 511.51">
          <path fill="" fillRule="nonzero" d="M174.43 443.27H21.31C9.54 443.27 0 433.73 0 421.97V21.3C0 9.51 9.52 0 21.31 0h200.94c3.64 0 6.97 1.66 9.15 4.36l104.84 102.09c5.64 5.64 8.62 10.07 8.62 11.43l-.02 135.35c-7.59-3.2-15.53-5.72-23.76-7.49l-.01-113.62h-98.82c-6.64 0-11.94-5.41-11.94-11.95V23.69H23.8v395.78h140.26c2.7 8.32 6.18 16.28 10.37 23.8zm118.07-169.1c28.59 0 54.48 11.59 73.22 30.33 18.75 18.74 30.33 44.63 30.33 73.23 0 20.92-6.2 40.39-16.87 56.68L424 483.26l-30.9 28.25-43.23-47.56c-16.42 10.95-36.15 17.34-57.37 17.34-28.6 0-54.49-11.6-73.22-30.34-18.75-18.74-30.34-44.63-30.34-73.22 0-28.6 11.59-54.49 30.33-73.23 18.74-18.74 44.63-30.33 73.23-30.33zm59.62 43.93c-15.25-15.26-36.33-24.7-59.62-24.7s-44.37 9.44-59.62 24.7c-15.26 15.26-24.7 36.34-24.7 59.63 0 23.28 9.44 44.37 24.7 59.62 15.25 15.26 36.33 24.69 59.62 24.69s44.37-9.43 59.62-24.69c15.26-15.26 24.7-36.34 24.7-59.62 0-23.29-9.44-44.37-24.7-59.63zm-36.35 21.39 14.49 14.57-23.37 23.67 23.39 23.69-14.53 14.49-23.25-23.54-23.27 23.58-14.49-14.57 23.36-23.67-23.38-23.69 14.53-14.49 23.24 23.54 23.28-23.58z" />
        </svg>
      </div>
    </div>
  );
};

const ClearIcon = ({ color = '#555', width = 20, height = 20, onClick }: { color?: string, width?: number, height?: number, onClick: (e: any) => void }) => {
  return (
    <svg onClick={(e) => onClick(e)} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fillRule="nonzero" />
    </svg>
  );
};

const CustomSelect = ({ options, disabled = false, filter = false, multiple = false, sorting, prefixIcon, selectedIcon, bindLabel, bindValue, placeHolder, onChange, notFoundText, closeOnSelect }: CustomSelectProps) => {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(multiple ? [] as any[] : null as any);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  if (!multiple) closeOnSelect = true;

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current && filter) {
      searchRef.current.focus();
    }
  }, [showMenu, filter]);

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) setShowMenu(false);
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const getLabelText = (label: any) => {
    if (typeof label === 'string') {
      return label;
    }

    if (React.isValidElement(label)) {
      let text = '';
      const element = label as React.ReactElement;
      React.Children.forEach(element.props.children, (child) => {
        if (typeof child === 'string') {
          text += child;
        } else if (React.isValidElement(child)) {
          text += getLabelText(child);
        }
      });
      return text;
    }

    return '';
  };

  const getOptions = useMemo(() => {
    let filteredOptions = options;

    if (searchValue) {
      filteredOptions = options.filter((option) => {
        const labelText = bindLabel ? getLabelText(option[bindLabel]) : getLabelText(option.label);
        return labelText.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    if (sorting) {
      const { sortKey, sortType } = sorting;
      filteredOptions = filteredOptions.sort((a, b) => {
        const aValue = getLabelText(a[sortKey]);
        const bValue = getLabelText(b[sortKey]);

        if (aValue < bValue) return sortType === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortType === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredOptions;
  }, [options, searchValue, bindLabel, sorting]);


  const isSelected = (option: any) => {
    if (multiple) return selectedValue!.filter((o: any) => bindValue ? o[bindValue] === option[bindValue] : o.value === option.value).length > 0;
    if (!selectedValue) return false;
    return bindValue ? selectedValue[bindValue] === option[bindValue] : selectedValue.value === option.value;
  };

  const onItemClick = useCallback((option: any) => {
    let newValue;
    if (multiple) {
      if (selectedValue.findIndex((o: any) => bindValue ? o[bindValue] === option[bindValue] : o.value === option.value) >= 0) newValue = removeOption(option);
      else newValue = [...selectedValue, option];
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
    if (closeOnSelect) {
      setShowMenu(false);
      searchRef.current!.value = '';
      document.querySelector('.customSelectValue')?.classList.remove('hideCurrent');
    }
  }, [multiple, selectedValue, bindValue, onChange, closeOnSelect]);

  const getDisplay = () => {
    return (multiple ?
      <div className="dropdown-tags">
        {
          selectedValue?.map((option: any, index: number) => (
            <div key={index} className="dropdown-tag-item">
              {bindLabel ? option[bindLabel] : option.label}
              <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close" >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5L5 11M5 5L11 11" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))
        }
        <input ref={searchRef} onChange={(e) => onSearch(e)} type="text" placeholder={!selectedValue || selectedValue.length === 0 ? placeHolder : ''} className="customSelectSearchInput multipleInput" disabled={filter !== true || disabled === true} />
      </div>
      : <>
        <input ref={searchRef} onChange={(e) => onSearch(e)} type="text" placeholder={!selectedValue || selectedValue.length === 0 ? placeHolder : ''} className="customSelectSearchInput" disabled={filter !== true || disabled === true} />
        <div className="customSelectValue">{bindLabel ? selectedValue?.[bindLabel] : selectedValue?.label}</div>
      </>
    );
  };

  const removeOption = (option: any) => {
    return selectedValue.filter((o: any) => bindValue ? (o[bindValue] !== option[bindValue]) : (o.value !== option.value));
  };

  const onTagRemove = (e: React.MouseEvent, option: any) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const handleInputClick = () => {
    if (!showMenu) setShowMenu(true);
    if (filter) searchRef.current!.focus();
  };

  const onSearch = (e: any) => {
    if (!multiple) {
      if (selectedValue) {
        if (e.target.value.length === 0) document.querySelector('.customSelectValue')?.classList.remove('hideCurrent')
        else document.querySelector('.customSelectValue')?.classList.add('hideCurrent')
      }
    }
    setSearchValue(e.target.value);
  };

  const clearValue = (e: any) => {
    e.stopPropagation();
    setSelectedValue(multiple ? [] : null);
  }

  return (
    <>
      <div ref={inputRef} className={`customSelectContainer ${disabled ? ' disabled' : ''} ${showMenu ? 'customSelectOpened' : ''}`} onClick={() => { handleInputClick() }}>
        {
          prefixIcon ? <div className="customSelectPrefixIcon"> {prefixIcon} </div> : ''
        }
        <div className={`customSelectArrow ${showMenu ? 'isOpen' : ''}`}>
          {!selectedValue || selectedValue.length === 0 ? <ArrowIcon /> : <ClearIcon onClick={(e) => clearValue(e)} />}
        </div>
        <div className={`customSelectValueContainer ${multiple ? 'multipleContainer' : ''} ${prefixIcon ? 'hasIcon' : ''}`}>
          {getDisplay()}
          <CSSTransition
            nodeRef={nodeRef}
            in={showMenu}
            timeout={100}
            classNames="dropdown"
            unmountOnExit
          >
            <div ref={nodeRef} className={`customSelectDropdown ${prefixIcon ? 'hasIcon' : ''}`}>
              {
                getOptions.length > 0 ? getOptions.map((option, index) => (
                  <div onClick={() => onItemClick(option)} key={index} className={`dropdown-item ${isSelected(option) ? 'selected' : ''}`} >
                    {bindLabel ? option[bindLabel] : option.label}
                    {(selectedIcon && isSelected(option)) ? <div className="selected-icon"> {selectedIcon} </div> : ''}
                  </div>
                )) : <NotFound text={notFoundText ?? 'Not Found'} />
              }
            </div>
          </CSSTransition>

        </div>
      </div>
    </>
  );
}

export default CustomSelect;