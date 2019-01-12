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
    (
      p. {
        <span
          className={ 'page-link' }
          href={ `#section-${sectionId}` }
        />
      }
  )
  </a>
);
