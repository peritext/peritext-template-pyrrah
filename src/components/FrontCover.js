import React from 'react';
import MarkdownPlayer from './MarkdownPlayer';
import Authors from './Authors';

export default ( {
  production: {
    metadata
  },
  edition,
  data: {
    backgroundColor,
    customCoverFooter,
    animatedBackground,
    svgData
  } = {},
  id
} ) => {
  if (svgData) {
    return (
      <section
        id={ 'front-cover' }
        className={ `composition-block front-cover`}
        dangerouslySetInnerHTML = {{
          __html: svgData
        }}
      />
    )
  }
  const {
    data: editionData = {}
  } = edition;
  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  const authors = editionData.publicationAuthors && editionData.publicationAuthors.length ? editionData.publicationAuthors : metadata.authors;
  return (
    <section
      id={ 'front-cover' }
      className={ `composition-block front-cover ${animatedBackground && animatedBackground !== 'none' ? `with-animated-background-${animatedBackground}` : ''}` }
      style={ {
        backgroundColor
      } }
    >
      <div className={ 'front-cover-content' }>
        <h1
          id={ id }
          className={ 'front-cover-title' }
        >
          {finalTitle}
        </h1>
        {
          finalSubtitle &&
          <h2 className={ 'front-cover-subtitle' }>{finalSubtitle}</h2>
        }
        <h3 className={ 'front-cover-authors' }>
          {
            metadata.authors &&
            <Authors authors={ authors } />
          }
        </h3>
      </div>
      {
        customCoverFooter && customCoverFooter.length > 0 &&
        <div className={ 'front-cover-footer' }>
          <MarkdownPlayer src={ customCoverFooter } />
        </div>
      }
    </section>
  );
};
