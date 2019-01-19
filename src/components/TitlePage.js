import React from 'react';
import MarkdownPlayer from './MarkdownPlayer';
import Authors from './Authors';

export default ( {
  production: {
    metadata
  },
  edition,
  data: {
    customCoverFooter
  } = {
  },
  id
} ) => {
  const {
    data: editionData = {}
  } = edition;

  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  const authors = editionData.publicationAuthors && editionData.publicationAuthors.length ? editionData.publicationAuthors : metadata.authors;
  return (
    <section
      className={ 'composition-block title-page' }
    >
      <div className={ 'title-page-content' }>
        <h1
          id={ id }
          className={ 'title-page-title' }
        >
          {finalTitle}
        </h1>
        {
          finalSubtitle &&
          <h2 className={ 'title-page-subtitle' }>{finalSubtitle}</h2>
        }
        <h3 className={ 'title-page-authors' }>
          {
            authors && authors.length > 0 ?
              <Authors authors={ authors } />
            : null
          }
        </h3>
      </div>
      {
        customCoverFooter && customCoverFooter.length > 0 &&
        <div className={ 'title-page-footer' }>
          <MarkdownPlayer src={ customCoverFooter } />
        </div>
      }
    </section>
  );
};
