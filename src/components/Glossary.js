import React from 'react';
import PropTypes from 'prop-types';
import { ReferencesManager } from 'react-citeproc';

import MarkdownPlayer from './MarkdownPlayer';

import {
  buildContextContent,
  getContextualizationsFromEdition
} from 'peritext-utils';

const buildGlossary = ( {
  production,
  edition,
  options
} ) => {
  const {
    contextualizers,
    resources
  } = production;

  const {
      showUncited = false,
      glossaryTypes = [ 'person', 'place', 'event', 'notion', 'other' ]
    } = options;

  let items;
  const usedContextualizations = getContextualizationsFromEdition( production, edition );
  if ( showUncited ) {
    items = Object.keys( production.resources )
        .filter( ( resourceId ) => production.resources[resourceId].metadata.type === 'glossary' )
        .map( ( resourceId ) => production.resources[resourceId] )
        .map( ( resource ) => {
          return {
            resource,
            mentions: usedContextualizations.filter( ( c ) => c.contextualization.sourceId === resource.id )
          };
        } );
  }
 else {
    items = usedContextualizations
      .filter( ( element ) => {
        const contextualization = element.contextualization;
        const contextualizerId = contextualization.contextualizerId;
        const contextualizer = contextualizers[contextualizerId];
        return contextualizer && contextualizer.type === 'glossary';
      } )
      .map( ( element ) => {
        const contextualization = element.contextualization;
        return {
          ...contextualization,
          contextualizer: contextualizers[contextualization.contextualizerId],
          resource: resources[contextualization.sourceId],
          contextContent: buildContextContent( production, contextualization.id ),
          containerId: element.containerId,
        };
      } )
      .reduce( ( entries, contextualization ) => {
        return {
          ...entries,
          [contextualization.sourceId]: {
            resource: contextualization.resource,
            mentions: entries[contextualization.sourceId] ?
                        entries[contextualization.sourceId].mentions.concat( contextualization )
                        : [ contextualization ]
          }
        };
      }, {} );
      items = Object.keys( items ).map( ( resourceId ) => ( {
        resource: items[resourceId].resource,
        mentions: items[resourceId].mentions
      } ) );
  }

  const glossaryMentions = items
  .filter( ( item ) => {
    return glossaryTypes.includes( item.resource.data.entryType );
  } )
  .sort( ( a, b ) => {
    if ( a.resource.data.name.toLowerCase() > b.resource.data.name.toLowerCase() ) {
      return 1;
    }
    else {
      return -1;
    }
  } );

  return glossaryMentions;
};

const Glossary = ( {
  production,
  edition,
  translate,
  citations,
  citationStyle,
  citationLocale,
  id,
  data = {
    showMentions: true,
    showDescriptions: true,
  },
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent,
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent,
} ) => {
  // const LinkComponent = propLinkComponent || contextLinkComponent;
  const MentionComponent = propMentionComponent || contextMentionComponent;
  const {
    showMentions,
    customTitle,
    showDescriptions,
  } = data;
  const glossary = buildGlossary( { options: data, production, edition } );
  return (
    <section
      className={ 'composition-block glossary' }
      title={ customTitle || translate( 'Glossary list' ) }
    >
      <ReferencesManager
        style={ citationStyle }
        locale={ citationLocale }
        items={ citations.citationItems }
        citations={ citations.citationData }
        componentClass={ 'references-manager' }
      >
        <h2
          className={ 'composition-block-title peritext-block-title' }
          id={ `glossary-block-${id}` }
        >{customTitle || translate( 'Glossary list' )}
        </h2>
        <ul className={ 'mentions-container' }>
          {
          glossary.map( ( entry, index ) => {
            // const entryName = entry.title;
            return (
              <li
                key={ index }
                id={ entry.resource.metadata.id }
                className={ 'mention-item' }
              >
                <div
                  className={ 'title' }
                >
                  {entry.resource.data.name}
                </div>
                {showDescriptions &&
                  <div
                    className={ 'description' }
                  >
                    <MarkdownPlayer src={ entry.resource.data.description } />
                  </div>
                }
                {showMentions && entry.mentions.length > 0 &&
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
                        return thatIndex > 0 ? [ prev, ', ', curr ] : [ curr ];
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

Glossary.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
};

export default Glossary;
