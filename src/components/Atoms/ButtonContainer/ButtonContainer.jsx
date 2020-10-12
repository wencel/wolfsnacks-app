import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classnames from 'classnames';
import Styles from './ButtonContainer.module.sass';
import Button from '../Button';
import { GoPlus } from 'react-icons/go';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ButtonContainer = ({ buttons, className, position, singleElem }) => {
  const isSingleElem = buttons.length === 1 || singleElem;
  const [showButtons, setShowButtons] = useState(false);
  const containerClasses = classnames({
    [className]: className,
    [Styles.ButtonContainer]: true,
    [Styles.visible]: showButtons,
    [Styles.singleElem]: isSingleElem,
    [Styles[position]]: true,
  });
  const backdropClasses = classnames({
    [Styles.backdrop]: true,
    [Styles.visible]: showButtons && !isSingleElem,
  });
  const createBaseButton = button => (
    <Button
      {...button}
      onClick={e => {
        hideButtons();
        if (button.onClick) button.onClick(e);
      }}
      theme='RoundWithLabel'
      label={button.text}
      className={Styles.item}
      type={button.type || 'text'}
      key={`${button.text}${button.icon}`}
    >
      {button.icon}
    </Button>
  );
  const hideButtons = () => {
    setShowButtons(false);
  };

  return (
    <>
      <div
        className={backdropClasses}
        onTouchMove={hideButtons}
        onMouseDown={hideButtons}
      />
      <div className={containerClasses}>
        {position === 'top' && !isSingleElem && (
          <Button
            onClick={() => {
              setShowButtons(!showButtons);
            }}
            theme='RoundWithLabel'
            className={`${Styles.item} ${Styles.addButton}`}
            type='button'
          >
            {showButtons ? <GoPlus /> : <FiMenu />}
          </Button>
        )}
        {buttons?.map(button => {
          return button.href ? (
            <Link
              className={Styles.link}
              key={`${button.text}${button.icon}`}
              to={button.href}
            >
              {createBaseButton(button)}
            </Link>
          ) : (
            createBaseButton(button)
          );
        })}
        {position === 'bottom' && !isSingleElem && (
          <Button
            onClick={() => {
              setShowButtons(!showButtons);
            }}
            theme='RoundWithLabel'
            className={`${Styles.item} ${Styles.addButton}`}
            type='button'
          >
            <GoPlus />
          </Button>
        )}
      </div>
    </>
  );
};

ButtonContainer.defaultProps = {
  position: 'bottom',
  buttons: [],
};

ButtonContainer.propTypes = {
  buttons: PropTypes.array,
  className: PropTypes.string,
  position: PropTypes.string,
};

export default ButtonContainer;
