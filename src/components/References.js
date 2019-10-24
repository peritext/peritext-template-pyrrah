import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import { ReferencesManager, makeBibliography } from 'react-citeproc';

import {
  buildContextContent,
  getContextualizationsFromEdition,
  resourceToCslJSON,
  getContextualizationMentions,
  buildCitations,
} from 'peritext-utils';

/**
 * Computes interactive bibliography materials
 * @return {array} items - list of context-loaded items
 */
function buildBibliography ( {
  production,
  edition,
  citations,
  contextualizations,
  showUncitedReferences,
  resourceTypes,
  sortingKey,
  sortingAscending,
} ) {

  const {
    resources
  } = production;

  /**
   * Select relevant resources
   */
  // filter cited references only
  let citedResourcesIds = showUncitedReferences ?
    Object.keys( resources )
    :
    uniq(
      getContextualizationsFromEdition( production, edition ).map( ( element ) => {
        const contextualization = element.contextualization;
        return contextualization.sourceId;
      } )
    );

  // filter by type of resource
  citedResourcesIds = citedResourcesIds.filter( ( resourceId ) => {
    const type = resources[resourceId].metadata.type;
    return resourceTypes.includes( type );
  } );
  const resourcesMap = citedResourcesIds.reduce( ( res, resourceId ) => {
    const mentions = contextualizations.filter( ( c ) => c.contextualization.sourceId === resourceId )
    .map( ( c ) => c.contextualization.id ) // contextualizations.filter( ( c ) => c.contextualization.sourceId === resourceId )
    .map( ( contextualizationId ) => getContextualizationMentions( { contextualizationId, production, edition } ) )

    .reduce( ( res2, contextualizationMentions ) => [
      ...res2,
      ...contextualizationMentions.map( ( { containerId, contextualizationId } ) => ( {
        id: contextualizationId,
        containerId,
        contextContent: buildContextContent( production, contextualizationId )
      } ) )

    ], [] );

    const citation = resourceToCslJSON( resources[resourceId] )[0];
    if ( resources[resourceId].metadata.type === 'bib' ) {
      return {
        ...res,
        [resources[resourceId].data.citations[0].id]: {
          ...resources[resourceId],
          citation,
          mentions,
        }
      };
    }
    return {
      ...res,
      [resourceId]: {
        ...resources[resourceId],
        mentions,
        citation,
      }
    };
  }, {} );

  const bibliographyData = makeBibliography(
    citations.citationItems,
    edition.data.citationStyle.data,
    edition.data.citationLocale.data,
  );
  const ids = bibliographyData[0].entry_ids.map( ( group ) => group[0] );
  let items = ids
  // .filter( ( id ) => resourcesMap[id] )
  .map( ( id, index ) => ( {
    id,
    resource: resourcesMap[id],
    citation: resourcesMap[id] && resourcesMap[id].citation,
    html: bibliographyData[1][index]
  } ) )
  .filter( ( i ) => i.citation );

  items = items.sort( ( a, b ) => {
    switch ( sortingKey ) {
      case 'mentions':
        if ( a.resource.mentions.length > b.resource.mentions.length ) {
          return -1;
        }
        return 1;
      case 'date':
        const datePartsA = a.citation.issued && a.citation.issued['date-parts'];
        const datePartsB = b.citation.issued && b.citation.issued['date-parts'];
        if ( datePartsA && datePartsB && datePartsA.length && datePartsB.length ) {

          if ( datePartsA[0] > datePartsB[0] ) {
            return 1;
          }
          else if ( datePartsA[0] < datePartsB[0] ) {
            return -1;
          }
          else if ( datePartsA.length > 1 && datePartsB.length > 1 ) {
            if ( datePartsA[1] > datePartsB[1] ) {
              return 1;
            }
            else if ( datePartsA[1] < datePartsB[1] ) {
              return -1;
            }
            else return 0;
          }
          else {
            return 0;
          }

        }
        else if ( !datePartsB || ( datePartsB && !datePartsB.length ) ) {
          return -1;
        }
        else if ( !datePartsA || ( datePartsA && !datePartsA.length ) ) {
          return 1;
        }
        else {
          return 0;
        }
      case 'authors':
        if ( a.citation.author && b.citation.author ) {
          const authorsA = a.citation.author && a.citation.author.map( ( author ) => `${author.family}-${author.given}`.toLowerCase() ).join( '' );
          const authorsB = b.citation.author && b.citation.author.map( ( author ) => `${author.family}-${author.given}`.toLowerCase() ).join( '' );
          if ( authorsA > authorsB ) {
            return 1;
          }
          else return -1;
        }
        else if ( !b.citation.author ) {
          return -1;
        }
        else if ( !a.citation.author ) {
          return 1;
        }
        else return 0;
      case 'title':
        if ( a.citation.title.toLowerCase() > b.citation.title.toLowerCase() ) {
          return 1;
        }
        return -1;
      default:
        break;
    }
  } );
  if ( !sortingAscending ) {
    items = items.reverse();
  }

  return items;
}

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
  citationStyle,
  citationLocale,

  id,
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent,
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent,
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

  const contextualizations = getContextualizationsFromEdition( production, edition );
  const citations = buildCitations( { production, edition } );

  const references = buildBibliography( {
    production,
    edition,
    citations,
    contextualizations,
    showUncitedReferences,
    resourceTypes,
    sortingKey,
    sortingAscending,
  } );

  return (
    <section
      className={ 'composition-block references' }
      title={ customTitle || translate( 'References' ) }
    >
      <ReferencesManager
        style={ citationStyle }
        locale={ citationLocale }
        items={ citations.citationItems }
        citations={ citations.citationData }
        componentClass={ 'references-manager' }
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
                id={ entry.citationKey }
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
      </ReferencesManager>
    </section>
  );
};

References.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
};

export default References;
