import React from 'react';

export default ( {
  href,
  target,
  // children,
  className,
  // MentionComponent,
  onePerPage,
  withoutP,
  id,
  style,
} ) => (
  <a
    href={ href }
    target={ target }
    className={ `page-link ${className || ''} ${onePerPage ? 'one-per-page' : ''}` }
    id={ id }
    style={ style }
  >
    {withoutP ? '' : 'p.'}
  </a>
);
