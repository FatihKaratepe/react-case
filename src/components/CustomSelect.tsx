import React, { useEffect, useRef, useState } from "react";
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
  onChange: (option: any) => void;
}

const ArrowIcon = ({ color = '#555', width = 16, height = 16 }: { color?: string, width?: number, height?: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill={color} d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
    </svg>
  );
};

const NotFound = ({ text }: { text?: string }) => {
  return (
    <>
      <div className="customSelectNotFoundContainer">
        {text}
      </div>
    </>
  );
};

const ClearIcon = ({ color = '#555', width = 20, height = 20, onClick }: { color?: string, width?: number, height?: number, onClick: (e: any) => void }) => {
  return (
    <svg onClick={(e) => onClick(e)} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fillRule="nonzero" />
    </svg>
  );
};

const CustomSelect = ({ options, disabled = false, filter = false, multiple = false, sorting, prefixIcon, selectedIcon, bindLabel, bindValue, placeHolder, onChange, notFoundText }: CustomSelectProps) => {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(multiple ? [] as any[] : null as any);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<any>();
  const inputRef = useRef<any>();

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

  const getOptions = () => {
    if (!searchValue) return options;
    return options.filter((option) => bindLabel ? option[bindLabel].toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 :
      option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };

  const isSelected = (option: any) => {
    if (multiple) return selectedValue!.filter((o: any) => bindValue ? o[bindValue] === option[bindValue] : o.value === option.value).length > 0;
    if (!selectedValue) return false;
    return bindValue ? selectedValue[bindValue] === option[bindValue] : selectedValue.value === option.value;
  };

  const onItemClick = (option: any) => {
    let newValue;
    if (multiple) {
      if (selectedValue.findIndex((o: any) => bindValue ? o[bindValue] === option[bindValue] : o.value === option.value) >= 0) newValue = removeOption(option);
      else newValue = [...selectedValue, option];
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
    setShowMenu(false);
    searchRef.current.value = '';
    document.querySelector('.customSelectValue')?.classList.remove('hideCurrent');
  };

  const getDisplay = () => {
    if (multiple) {
      return (
        <div className="dropdown-tags">
          {
            selectedValue.map((option: any, index: number) => (
              <div key={index} className="dropdown-tag-item">
                {bindLabel ? option[bindLabel] : option.label}
                <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close" >
                  &times;
                </span>
              </div>
            ))
          }
        </div>
      );
    }
    return <div className="customSelectValue">{bindLabel ? selectedValue[bindLabel] : selectedValue.label}</div>
  };

  const removeOption = (option: any) => {
    return selectedValue.filter((o: any) => bindValue ? o[bindValue] === option[bindValue] : o.value === option.value);
  };

  const onTagRemove = (e: React.MouseEvent, option: any) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const handleInputClick = () => {
    if (!showMenu) setShowMenu(true);
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
      <div ref={inputRef} className={`customSelectContainer ${disabled ? 'disabled' : ''}`} onClick={() => { handleInputClick() }}>
        <div className={`customSelectArrow ${showMenu ? 'isOpen' : ''}`}>
          {!selectedValue || selectedValue.length === 0 ? <ArrowIcon /> : <ClearIcon onClick={(e) => clearValue(e)} />}
        </div>
        <div className="customSelectValueContainer">
          <input ref={searchRef} onChange={(e) => onSearch(e)} type="text" placeholder={!selectedValue || selectedValue.length === 0 ? placeHolder : ''} className="customSelectSearchInput" disabled={filter !== true || disabled === true} />
          {!selectedValue || selectedValue.length === 0 ? '' : getDisplay()}
          <div className={`customSelectDropdown${showMenu ? ' isOpen' : ''}`}>
            {
              getOptions().length > 0 ? getOptions().map((option, index) => (
                <div onClick={() => onItemClick(option)} key={index} className={`dropdown-item${isSelected(option) ? ' selected' : ''}`} >
                  {bindLabel ? option[bindLabel] : option.label}
                </div>
              )) : <NotFound text={notFoundText ?? 'Not Found'} />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomSelect;