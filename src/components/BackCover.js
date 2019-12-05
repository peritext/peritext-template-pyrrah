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
    textColor,
    useAbstract = true,
    customMarkdownContents,
    animatedBackground,
    customCoverFooter,
  } = {},
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
      className={ `composition-block back-cover ${animatedBackground && animatedBackground !== 'none' ? `with-animated-background-${animatedBackground}` : ''}` }
      style={ {
      backgroundColor,
      color: textColor
    } }
    >
      <div className={ 'back-cover-content' }>
        <h2
          id={ id }
          className={ 'back-cover-title' }
        >{finalTitle}
        </h2>
        {
        finalSubtitle &&
        <h3 className={ 'back-cover-subtitle' }>
          {finalSubtitle}
        </h3>
      }
        {metadata.authors &&
        <h3 className={ 'back-cover-authors' }>
          <Authors authors={ authors } />
        </h3>
      }
        <div className={ 'back-cover-text' }>
          {useAbstract && <MarkdownPlayer src={ metadata.abstract } />}
          {customMarkdownContents && customMarkdownContents.trim().length ?
            <MarkdownPlayer src={ customMarkdownContents } />
         : null
       }
        </div>

        {
        customCoverFooter && customCoverFooter.length > 0 &&
        <div className={ 'back-cover-footer' }>
          <MarkdownPlayer src={ customCoverFooter } />
        </div>
      }
      </div>
    </section>
);
};
