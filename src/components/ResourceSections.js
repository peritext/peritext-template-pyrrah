import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import EndNotes from './EndNotes';
import Figures from './Figures';

import { buildFiguresNumberMap } from '../helpers';

import {
  buildCitations,
  buildResourceSectionsSummary,
} from 'peritext-utils';

const ResourceSections = ( {
  production,
  translate,
  data = {
    showMentions: true,
    resourceTypes: [ 'glossary' ],
    notesPosition: 'footnotes',
    figuresPosition: 'inBody',
    customSummary: {
      active: false,
      summary: []
    },
    level: 0,
  },
  citationStyle,
  citationLocale,

  id,
  publicationTitle,
  publicationSubtitle,

}, {
} ) => {
  const {

    /*
     * showMentions,
     * resourceTypes,
     */
    notesPosition,
    figuresPosition,
    displayHeader = false
  } = data;
  const summary = buildResourceSectionsSummary( { production, options: data } );

  const citations = buildCitations( { production, /*edition*/ } );
  const sectionsIds = summary.map( ( { resourceId } ) => resourceId );
  const { figuresNumberMap, figures } = buildFiguresNumberMap( { production, sectionsIds, figuresPosition } );
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
              figuresPosition={ figuresPosition }
              figuresNumberMap={ figuresNumberMap }
              figures={ figuresPosition === 'endOfSections' ? figures[resourceId] : undefined }
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
          /> : null,
        figuresPosition === 'endOfContents' ?
          <Figures
            production={ production }

            translate={ translate }
            figures={ figures }
            figuresNumberMap={ figuresNumberMap }
          /> : null

      ];
};

ResourceSections.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
};

export default ResourceSections;
