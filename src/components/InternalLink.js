import React from 'react';
import PropTypes from 'prop-types';

const InternalLink = ( { sectionId, children }, { containerId } ) => (
  <a
    href={ `#section-${containerId}-${sectionId}` }
    className={ 'internal-link' }
  >
    {children}
    <span> (p. </span>
    <span
      className={ 'page-link' }
      href={ `#section-${containerId}-${sectionId}` }
    />
    <span>)</span>
  </a>
);

InternalLink.contextTypes = {
  containerId: PropTypes.string
};

export default InternalLink;
