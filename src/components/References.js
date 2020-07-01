import React from 'react';
import PropTypes from 'prop-types';

import {
  buildBibliography,
} from 'peritext-utils';

const detailedGroups = [
  'article',
  'article-journal',
  'article-magazine',
  'article-newspaper',
  'bill',
  'book',
  'broadcast',
  'chapter',
  'classic',
  'collection',
  'dataset',
  'document',
  'entry',
  'entry-dictionary',
  'entry-encyclopedia',
  'figure',
  'graphic',
  'hearing',
  'interview',
  'legal_case',
  'legislation',
  'manuscript',
  'map',
  'motion_picture',
  'musical_score',
  'pamphlet',
  'paper-conference',
  'patent',
  'performance',
  'periodical',
  'personal_communication',
  'post',
  'post-weblog',
  'regulation',
  'report',
  'review',
  'review-book',
  'software',
  'song',
  'speech',
  'standard',
  'thesis',
  'treaty',
  'webpage'
];
const generalGroups = {
  books: [
    'book',
  ],
  thesis: [
    'thesis'
  ],
  chapters_papers: [
    'chapter',
    'article-journal',
    'paper-conference'
  ],
  laws_and_norms: [
    'standard',
    'regulation',
    'legislation',
    'reports',
  ],
  software: [
    'software'
  ],
  webpages_and_blogposts: [
    'webpage',
    'post',
    'post-weblog',
    'article-magazine',
    'article-newspaper',
    'interview',
    'patent',
  ],
  dictionaries_encyclopedias_entries: [
    'entry-dictionary',
    'entry-encyclopedia',
    'entry',
  ],
  multimodal: [
    'speech',
    'song',
    'broadcast',
    'dataset',
    'hearing',
    'map',
    'motion_picture',
    'musical_score',
    'performance',
  ],
  other: [
    'review',
    'review-book',
    'treaty',
    'figure',
    'graphic',
    'article',
    'bill',
    'classic',
    'collection',
    'document',
    'legal_case',
    'manuscript',
    'pamphlet',
    'periodical',
    'personal_communication',
  ]
};

const References = ( {
  production,
  edition,
  translate,
  data = {
    showMentions: true,
    showUncitedReferences: false,
    resourceTypes: [ 'bib' ],
    sortingKey: 'authors',
    sortingAscending: true,
    groupingBy: 'none'
  },

  // citations,

  id,
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent,
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent,
  preprocessedData
} ) => {
  const {
    showMentions,
    showUncitedReferences,
    resourceTypes,
    sortingKey,
    sortingAscending,
    customTitle,
    groupingBy = 'none'
  } = data;

  // const LinkComponent = propLinkComponent || contextLinkComponent;
  const MentionComponent = propMentionComponent || contextMentionComponent;

  const preprocessedBiblio = preprocessedData && preprocessedData.blocks && preprocessedData.blocks[id] && preprocessedData.blocks[id].bibliographyData;
  let allReferences;
  if ( preprocessedBiblio ) {
    allReferences = preprocessedBiblio;
  }
 else {
    allReferences = buildBibliography( {
      production,
      edition,
      // contextualizations,
      options: {
        showUncitedReferences,
        resourceTypes,
        sortingKey,
        sortingAscending,
      }
    } );
  }
  let referenceGroups;
  if ( groupingBy === 'none' ) {
    referenceGroups = [
      {
        title: '',
        references: allReferences
      }
    ];
  }
 else if ( groupingBy === 'general' ) {
    referenceGroups = Object.keys( generalGroups ).map( ( key ) => {
      const types = generalGroups[key];
      return {
        title: translate( key ),
        references: allReferences.filter( ( r ) => types.includes( r.citation.type ) )
      };
    } );
  }
 else {
    referenceGroups = detailedGroups.map( ( key ) => {
      return {
        title: translate( key ),
        references: allReferences.filter( ( r ) => r.citation.type === key )
      };
    } );
  }

  return (
    <section
      className={ 'composition-block references' }
      title={ customTitle || translate( 'References' ) }
    >

      <h2
        id={ `reference-block-${id}` }
        className={ 'composition-block-title peritext-block-title' }
      >
        {customTitle || translate( 'References' )}
      </h2>
      {
        referenceGroups
        .filter( ( group ) => group.references.length )
        .map( ( group, globalIndex ) => {
          const { references } = group;
          return (
            <div key={ globalIndex }>
              {group.title && group.title.length ?
                <h3 className={ 'reference-type-title' }>{group.title}</h3>
              : null}
              <ul className={ 'mentions-container' }>
                {
                  references.map( ( entry, index ) => {
                    // const entryName = entry.title;
                    return (
                      <li
                        key={ index }
                        id={ entry.id }
                        className={ 'mention-item' }
                      >
                        <div
                          className={ 'title' }
                        >
                          <div dangerouslySetInnerHTML={ {
                            __html: entry.html/* eslint react/no-danger: 0 */
                          } }
                          />
                        </div>
                        {
                          showMentions &&
                          entry.resource.mentions &&
                          entry.resource.mentions
                              .find( ( mention ) => mention && mention.contextContent )
                            &&

                            <div className={ 'mentions-list pagedjs_reduce_mentions' }>
                              {
                              entry.resource.mentions
                              .filter( ( mention ) => mention !== undefined && mention.contextContent )
                              .map( ( mention, count ) => {
                                const {
                                    contextContent: {

                                      /*
                                       * targetContents,
                                       * contents,
                                       * sectionTitle,
                                       */
                                      sectionId,
                                    },
                                    id: thatId,
                                    containerId,
                                } = mention;
                                return (
                                  <MentionComponent
                                    key={ count }
                                    href={ `#contextualization-${containerId}-${thatId}` }
                                    sectionId={ sectionId }
                                    withoutP
                                  />
                                );
                              } )
                              .reduce( ( prev, curr, thatIndex ) => {
                                if ( thatIndex === 0 ) {
                                  return [ curr ];
                                }
                                return [ prev, ', ', curr ];
                              }, [] )
                            }
                            </div>
                        }
                      </li>
                    );
                  } )
                }
              </ul>
            </div>
          );
        } )
      }

    </section>
  );
};

References.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
  preprocessedData: PropTypes.object
};

export default References;
