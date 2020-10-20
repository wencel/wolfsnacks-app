import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { RiCloseLine } from 'react-icons/ri';
import Styles from './SearchField.module.sass';
import Input from '../../Atoms/Input';
import InlineLoading from 'components/Atoms/InlineLoading';
import { idGenerator } from 'utils/utils';
import Button from 'components/Atoms/Button/Button';

const SearchField = ({
  className,
  label,
  onSearch,
  isLoading,
  itemsList,
  onSelect,
  value,
  valueLabel,
}) => {
  const [inputValue, setInputValue] = useState('');
  const searchFieldClasses = classnames({
    [className]: className,
    [Styles.SearchField]: true,
  });
  const listClasses = classnames({
    [Styles.visible]: isLoading || itemsList.length > 0 || inputValue,
    [Styles.listContainer]: true,
  });
  const selectItem = value => () => {
    setInputValue('');
    onSelect(value);
  };
  useEffect(() => {
    onSearch(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <>
      <div className={searchFieldClasses}>
        <Input
          label={label}
          type='text'
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
        {(isLoading || itemsList.length > 0 || inputValue) && (
          <button
            className={Styles.cancelButton}
            type='button'
            onClick={selectItem(null)}
          >
            <RiCloseLine />
          </button>
        )}
        <div className={listClasses}>
          {isLoading && <InlineLoading />}
          {inputValue && itemsList.length === 0 && !isLoading && (
            <div>No hay resultado de la busqueda</div>
          )}
          {inputValue &&
            itemsList.length > 0 &&
            !isLoading &&
            itemsList.map(item => (
              <Button
                key={idGenerator()}
                type='button'
                theme='Outline'
                onClick={selectItem(item.value)}
                className={Styles.button}
              >
                {item.label}
              </Button>
            ))}
        </div>
      </div>
      {value && (
        <div className={Styles.relative}>
          <Input label={valueLabel} type='text' value={value} disabled />
          <button
            className={Styles.cancelButton}
            type='button'
            onClick={selectItem(null)}
          >
            <RiCloseLine />
          </button>
        </div>
      )}
    </>
  );
};

SearchField.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  itemsList: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
};

SearchField.defaultProps = {
  onSearch: () => {},
  onSelect: () => {},
  label: 'Buscar',
};

export default SearchField;
