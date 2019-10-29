import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import EndNotes from './EndNotes';

import {
  buildCitations,
  buildResourceSectionsSummary,
} from 'peritext-utils';

const ResourceSections = ( {
  production,
  // edition,
  translate,
  data = {
    showMentions: true,
    resourceTypes: [ 'glossary' ],
    notesPosition: 'footnotes',
    customSummary: {
      active: false,
      summary: []
    },
    level: 0,
  },

  // citations,
  citationStyle,
  citationLocale,

  id,
  publicationTitle,
  publicationSubtitle,

  /*
   * LinkComponent: propLinkComponent,
   * MentionComponent: propMentionComponent,
   */
}, {

  /*
   * LinkComponent: contextLinkComponent,
   * MentionComponent: contextMentionComponent,
   */
} ) => {
  const {

    /*
     * showMentions,
     * resourceTypes,
     */
    notesPosition,

    /*
     * customSummary,
     * level: inputLevel,
     */
    displayHeader = false
  } = data;

  // const blockLevel = !isNaN( inputLevel );

  /*
   * const LinkComponent = propLinkComponent || contextLinkComponent;
   * const MentionComponent = propMentionComponent || contextMentionComponent;
   */

  const summary = buildResourceSectionsSummary( { production, options: data } );

  const citations = buildCitations( { production, /*edition*/ } );

  return [

        ...summary.map( ( { resourceId, level } ) => {
          const section = production.resources[resourceId];
          return (
            <Section
              section={ section }
              className={ 'resource-section' }
              notesPosition={ notesPosition }
              key={ `${id}-${resourceId}` }
              production={ production }
              level={ level }
              containerId={ id }
              translate={ translate }
              citations={ citations }
              citationStyle={ citationStyle }
              citationLocale={ citationLocale }
              publicationTitle={ publicationTitle }
              publicationSubtitle={ publicationSubtitle }
              displayHeader={ displayHeader }
            />
          );
        } ),

        // @todo endnotes relative to sections and not to production sectionsOrder
        notesPosition === 'endOfContents' ?
          <EndNotes
            key={ 'endnotes' }
            sectionsIds={ summary.map( ( { resourceId } ) => resourceId ) }
            production={ production }

            translate={ translate }
            citations={ citations }
            citationStyle={ citationStyle }
            citationLocale={ citationLocale }
            publicationTitle={ publicationTitle }
            publicationSubtitle={ publicationSubtitle }
          /> : null

      ];
};

ResourceSections.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
};

export default ResourceSections;
