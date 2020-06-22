import React from 'react';
import PropTypes from 'prop-types';

import MarkdownPlayer from './MarkdownPlayer';

import {
  buildGlossary,
} from 'peritext-utils';

const Glossary = ( {
  production,
  edition,
  translate,
  // citations,
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
  preprocessedData
} ) => {
  // const LinkComponent = propLinkComponent || contextLinkComponent;
  const MentionComponent = propMentionComponent || contextMentionComponent;
  const {
    showMentions,
    customTitle,
    showDescriptions,
  } = data;
  const glossary = ( preprocessedData && preprocessedData.blocks && preprocessedData.blocks[id] && preprocessedData.blocks[id].glossaryData )
  || buildGlossary( { options: data, production, edition } );
  return (
    <section
      className={ 'composition-block glossary' }
      title={ customTitle || translate( 'Glossary list' ) }
    >
      <h2
        className={ 'composition-block-title peritext-block-title' }
        id={ `glossary-block-${id}` }
      >{customTitle || translate( 'Glossary list' )}
      </h2>
      <ul className={ 'mentions-container' }>
        {
          glossary
          .sort( ( a, b ) => {
            if ( a.resource.data.name.toLowerCase() > b.resource.data.name.toLowerCase() ) {
              return 1;
            }
            return -1;
          } )
          .map( ( entry, index ) => {
            // const entryName = entry.title;
            return (
              <li
                key={ index }
                id={ `glossary-item-${entry.resource.id}` }
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
    </section>
  );
};

Glossary.contextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
  preprocessedData: PropTypes.object,
};

export default Glossary;
