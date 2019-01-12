import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { ReferencesManager, makeBibliography } from 'react-citeproc';

import {
  buildContextContent,
  getContextualizationsFromEdition,
  resourceToCslJSON
} from 'peritext-utils';

/**
 * Builds an interactive bibliography for a given edition
 * @returns {ReactMarkup}
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

    /*
     * contextualizations,
     * contextualizers,
     */
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
      contextualizations.map( ( element ) => {
        const contextualization = element.contextualization;
        return contextualization.resourceId;
      } )
    );
  // filter by type of resource
  citedResourcesIds = citedResourcesIds.filter( ( resourceId ) => {
    const type = resources[resourceId].metadata.type;
    return resourceTypes.includes( type );
  } );

  let items = citedResourcesIds.map( ( resourceId ) => {
    const cit = resourceToCslJSON( resources[resourceId] );
    const citationKey = cit && cit[0] && cit[0].id;
    const mentions = contextualizations.map( ( element ) => {
      if ( element.contextualization.resourceId === resourceId ) {
        return {
          ...element,
          id: element.contextualization.id
        };
      }
    } ).filter( ( s ) => s );

    let biblio;
    if ( citations.citationItems[citationKey] ) {
      biblio = makeBibliography(
        citations.citationItems,
        edition.data.citationStyle.data,
        edition.data.citationLocale.data,
        {
          select: [ {
            field: 'id',
            value: citationKey
          } ]
        }
      );
    }
    else {
      biblio = makeBibliography(
        { [resourceId]: { ...cit[0], id: resourceId } },
        edition.data.citationStyle.data,
        edition.data.citationLocale.data,
        {
          select: [ {
            field: 'id',
            value: resourceId
          } ]
        }
      );
    }
    const title = biblio && biblio[1] && biblio[1][0];
    return {
      citationKey,
      title,
      item: citations.citationItems[citationKey] || cit[0],
      mentions: mentions.map( ( mention ) => ( {
        ...mention,
        contextContent: buildContextContent( production, mention.id )
      } ) )
    };
  } );

  items = items.sort( ( a, b ) => {
    switch ( sortingKey ) {
      case 'date':
        const datePartsA = a.item.issued && a.item.issued['date-parts'];
        const datePartsB = b.item.issued && b.item.issued['date-parts'];
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
          if ( a.item.author && b.item.author ) {
            const authorsA = a.item.author && a.item.author.map( ( author ) => `${author.family}-${author.given}`.toLowerCase() ).join( '' );
            const authorsB = b.item.author && b.item.author.map( ( author ) => `${author.family}-${author.given}`.toLowerCase() ).join( '' );
            if ( authorsA > authorsB ) {
              return 1;
            }
            else return -1;
          }
          else if ( !b.item.author ) {
            return -1;
          }
          else if ( !a.item.author ) {
            return 1;
          }
          else return 0;
      case 'title':
        if ( a.item.title.toLowerCase() > b.item.title.toLowerCase() ) {
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

  citations,
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

  /**
   * @todo compute citations based on edition
   */
  const contextualizations = getContextualizationsFromEdition( production, edition );
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
            const entryName = entry.title;
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
                    __html: entryName/* eslint react/no-danger: 0 */
                  } }
                  />
                </div>
                {
                  showMentions &&
                  entry.mentions
                      .find( ( mention ) => mention && mention.contextContent )
                    &&

                    <div className={ 'mentions-list' }>
                      {
                      entry.mentions
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
