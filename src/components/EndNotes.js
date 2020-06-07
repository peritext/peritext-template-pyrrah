import React from 'react';

import Renderer from './Renderer';
import CitationsProvider from './CitationsProvider';

export default ( {
  production: {
    resources
  },
  sectionsIds = [],
  translate,
  title,
  citations,
  id,
} ) => {
  const notes = sectionsIds.reduce( ( results, resourceId ) => {
    const theseNotes = ( resources[resourceId] && resources[resourceId].data && resources[resourceId].data.contents && resources[resourceId].data.contents.notes ) || {};
    return results.concat(
      Object.keys( theseNotes )
      .map( ( thatId ) => ( { ...theseNotes[thatId], id: thatId } ) )
    );
  }
  , [] );
  return (
    <section
      className={ 'end-notes' }
      title={ title }
      id={ id }
    >
      <CitationsProvider
        citations={ citations }
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
      </CitationsProvider>
    </section>
  );
};
