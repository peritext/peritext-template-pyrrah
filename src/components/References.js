import React from 'react';
import PropTypes from 'prop-types';

import {
  buildBibliography,
} from 'peritext-utils';

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
  } = data;

  // const LinkComponent = propLinkComponent || contextLinkComponent;
  const MentionComponent = propMentionComponent || contextMentionComponent;

  const preprocessedBiblio = preprocessedData && preprocessedData.blocks && preprocessedData.blocks[id] && preprocessedData.blocks[id].bibliographyData;
  let references;
  if ( preprocessedBiblio ) {
    references = preprocessedBiblio;
  }
 else {
    references = buildBibliography( {
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

                    <div className={ 'mentions-list' }>
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
    </section>
  );
};

References.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
  preprocessedData: PropTypes.object
};

export default References;
