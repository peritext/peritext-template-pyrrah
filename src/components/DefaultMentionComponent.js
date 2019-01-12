import React from 'react';

export default ( {
  href,
  target,
  // children,
  className,
  id,
  style,
} ) => (
  <a
    href={ href }
    target={ target }
    className={ `page-link ${className || ''}` }
    id={ id }
    style={ style }
  >
    p.
  </a>
);
