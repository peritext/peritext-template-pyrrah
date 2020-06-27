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
    customCoverFooter,
    animatedBackground,
    customHTML,
  } = {},
  id
} ) => {
  if ( customHTML && customHTML.length ) {
    return (
      <section
        className={ 'composition-block back-cover  has-custom-html' }
        dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
          __html: customHTML
        } }
      />
    );
  }
  // if ( svgData ) {
  //   return (
  //     <section
  //       id={ 'front-cover' }
  //       className={ 'composition-block front-cover' }
  //       dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
  //         __html: svgData
  //       } }
  //     />
  //   );
  // }
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
        backgroundColor,
        color: textColor,
      } }
    >
      <div className={ 'front-cover-content' }>
        <h1
          id={ id }
          className={ 'front-cover-title' }
          style={ {
            color: textColor,
          } }
        >
          {finalTitle}
        </h1>
        {
          finalSubtitle &&
          <h2
            className={ 'front-cover-subtitle' }
            style={ {
              color: textColor,
            } }
          >{finalSubtitle}
          </h2>
        }
        <h3
          className={ 'front-cover-authors' }
          style={ {
            color: textColor,
          } }
        >
          {
            metadata.authors &&
            <Authors authors={ authors } />
          }
        </h3>
      </div>
      {
        customCoverFooter && customCoverFooter.length > 0 &&
        <div
          className={ 'front-cover-footer' }
          style={ {
            color: textColor,
          } }
        >
          <MarkdownPlayer src={ customCoverFooter } />
        </div>
      }
    </section>
  );
};
