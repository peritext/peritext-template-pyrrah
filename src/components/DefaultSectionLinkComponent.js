import React from 'react';

export default ( {
  sectionId,
  target,
  children,
  className,
  id,
  style,
} ) => (
  <a
    href={ `#section-${sectionId}` }
    target={ target }
    className={ `page-link ${className}` }
    id={ id }
    style={ style }
  >
    {children}
    <span>{'\u00A0(p. '}</span>
    <a
      className={ 'page-link' }
      href={ `#section-${sectionId}` }
    />
    <span>)</span>
  </a>
);
