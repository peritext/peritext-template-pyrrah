import React from 'react';

import Renderer from './Renderer';
import { ReferencesManager } from 'react-citeproc';

export default ( {
  production: {
    sections
  },
  sectionsIds: sectionsOrder,
  translate,
  title,
  citations,
  citationStyle,
  citationLocale,
  id,
} ) => (
  <section
    className={ 'end-notes' }
    title={ title }
    id={ id }
  >
    <ReferencesManager
      style={ citationStyle }
      locale={ citationLocale }
      items={ citations.citationItems }
      citations={ citations.citationData }
      componentClass={ 'references-manager' }
    >
      <h1 className={ 'section-title' }>{title || translate( 'Notes' )}</h1>
      <ol className={ 'end-notes' }>
        {
          sectionsOrder.reduce( ( results, sectionId ) =>
            results.concat(
              Object.keys( sections[sectionId].data.contents.notes )
              .map( ( thatId ) => ( { ...sections[sectionId].data.contents.notes[thatId], id: thatId } ) )
            )
          , [] )
          .map( ( note, index ) => {
            return (
              <li
                id={ `note-content-${note.id}` }
                key={ index }
              >
                <a
                  href={ `#note-pointer-${note.id}` }
                  className={ 'note-number' }
                >
                  {index + 1}
                </a>
                <Renderer raw={ note.contents } />
              </li>
            );
          } )
        }
      </ol>
    </ReferencesManager>
  </section>
);
