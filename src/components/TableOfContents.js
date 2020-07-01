import React from 'react';

const TocElement = ( {
  title,
  href,
  level = 0,
  children,
} ) => (
  <li
    className={ `table-of-contents-element level-${level}` }
  >
    <span className={ 'element-title' }>
      <span>{title}</span>
      <span className={ 'element-leading' } />
    </span>
    <a
      className={ 'page-link' }
      href={ `#${href}` }
    />
    {
        children && children.length ?
          <ul>
            {
            children.map( ( child, childIndex ) => (
              <TocElement
                { ...child }
                key={ childIndex }
              />
            ) )
          }
          </ul>
        : null
      }
  </li>
);

export default ( {
  tableOfContents,
  data: {
    customTitle,
    displayPageNumber
  } = {},
  translate
} ) => (
  <section
    className={ `composition-block table-of-contents ${displayPageNumber ? 'has-page-number' : ''}` }
  >
    <h2 className={ 'composition-block-title peritext-block-title' }>{
      customTitle && customTitle.trim().length ?
      customTitle
      :
      translate( 'Table of contents' )
    }
    </h2>
    <ul className={ 'table-of-contents-elements-container' }>
      {
        tableOfContents
        .filter( ( item ) => item.title.length )
        .map( ( item, index ) => {
          return (
            <TocElement
              key={ index }
              title={ item.title }
              href={ item.href }
              level={ item.level }
            />
          );
        } )
      }
    </ul>
  </section>
);
