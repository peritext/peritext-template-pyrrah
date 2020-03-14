import React from 'react';

const Authors = ( {
  authors,
  displayRole = false,
} ) =>
  authors
    .map( ( author = {}, index ) =>
      (
        <span
          className={ "author'" }
          key={ index }
        >
          {author.given && author.given.trim()} {author.family && author.family.trim()}{
          displayRole && author.role ?
          ` (${author.role})`
          : ''
        }
        </span>
      )
    )
    .reduce( ( prev, curr, index ) => {
      if ( index > 0 ) {
        return [ prev, ', ', curr ];
      }
      return [ curr ];
    }, [] );

export default Authors;
