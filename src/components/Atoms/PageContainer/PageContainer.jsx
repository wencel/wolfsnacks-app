import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Styles from './PageContainer.module.sass';

const PageContainer = ({ containerRef, children, className, ...restProps }) => {
  const containerClasses = classnames({
    [className]: className,
    [Styles.PageContainer]: true,
  });
  return (
    <div ref={containerRef} className={containerClasses} {...restProps}>
      {children}
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default PageContainer;
