import React from 'react';

import Renderer from './Renderer';
import { ReferencesManager } from 'react-citeproc';

export default ( {
  production: {
    resources
  },
  sectionsIds = [],
  translate,
  title,
  citations,
  citationStyle,
  citationLocale,
  id,
} ) => {
  const notes = sectionsIds.reduce( ( results, resourceId ) =>
    results.concat(
      Object.keys( resources[resourceId].data.contents.notes )
      .map( ( thatId ) => ( { ...resources[resourceId].data.contents.notes[thatId], id: thatId } ) )
    )
  , [] );
  return (
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
        {notes.length > 0 ? <h1 className={ 'section-title' }>{title || translate( 'Notes' )}</h1> : null }
        <ol className={ 'end-notes' }>
          {
            notes
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
};
