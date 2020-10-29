import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Styles from './Input.module.sass';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';

const Input = ({
  options,
  type,
  className,
  label,
  id,
  value,
  ref,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  let actualRef = ref ? ref : inputRef;
  const inputClasses = classnames({
    [className]: className,
    [Styles.Input]: true,
  });
  const labelClasses = classnames({
    [Styles.active]: isFocused || value || value === 0,
  });
  return (
    <div className={inputClasses}>
      {label ? (
        <label
          onClick={() => {
            actualRef.current.focus();
          }}
          className={labelClasses}
          htmlFor={id}
        >
          {label}
        </label>
      ) : (
        ''
      )}
      {type === 'select' && (
        <select
          ref={actualRef}
          onFocus={() => {
            setIsFocused(true);
            actualRef.current.click();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          id={id}
          value={value}
          {...restProps}
        >
          {options.map(option => (
            <option
              disabled={option === '' || option.value === ''}
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>
      )}
      {type === 'textarea' && (
        <textarea
          ref={actualRef}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          id={id}
          value={value}
          {...restProps}
        />
      )}
      {type === 'number' && (
        <NumberFormat
          getInputRef={el => (actualRef.current = el)}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          id={id}
          value={value}
          {...restProps}
          thousandSeparator='.'
          decimalSeparator=','
          isNumericString={true}
        />
      )}

      {!['select', 'textarea', 'number'].includes(type) && (
        <input
          ref={actualRef}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          id={id}
          value={value}
          type={type}
          {...restProps}
        />
      )}
    </div>
  );
};
Input.defaultProps = {
  type: 'text',
  options: [],
};
Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  ref: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.instanceOf(),
    }),
    PropTypes.func,
  ]),
  type: PropTypes.string,
  value: PropTypes.any,
};

export default Input;
