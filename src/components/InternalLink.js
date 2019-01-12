import React from 'react';
import PropTypes from 'prop-types';

const InternalLink = ( { sectionId, children }, { containerId } ) => (
  <a
    href={ `#section-${containerId}-${sectionId}` }
    className={ 'internal-link' }
  >
    {children}
    {'('}
    <span
      href={ `#section-${containerId}-${sectionId}` }
      className={ ' page-link' }
    >
      {'p'}
    </span>
    {')'}
  </a>
);

InternalLink.contextTypes = {
  containerId: PropTypes.string
};

export default InternalLink;
