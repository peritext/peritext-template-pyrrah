import React from 'react';
import MarkdownPlayer from './MarkdownPlayer';

export default ( {
  data: {
    customText,
    copyright,
    issn,
    isbn
  } = {
  },
  id
} ) => {

  return (
    <section
      id={ id }
      className={ 'composition-block colophon' }
    >
      <div className={ 'colophon-content' }>
        {
          customText && customText.length > 0 &&
          <div className={ 'colophon-custom-text' }>
            <MarkdownPlayer src={ customText } />
          </div>
        }
        {
          copyright && copyright.length > 0 &&
          <div className={ 'colophon-copyright' }>
            <MarkdownPlayer src={ copyright } />
          </div>
        }
        {
          isbn && isbn.length > 0 &&
          <div className={ 'colophon-isbn' }>
            ISBN {isbn}
          </div>
        }
        {
          issn && issn.length > 0 &&
          <div className={ 'colophon-issn' }>
            ISSN {issn}
          </div>
        }

      </div>

    </section>
  );
};
