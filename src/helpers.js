
const parseEligibleContextualizations = ( production, contents ) =>
  Object.keys( contents.entityMap || {} ).reduce( ( res2, entityKey ) => {
    const entity = contents.entityMap[entityKey];
    if ( [ 'BLOCK_ASSET', 'INLINE_ASSET' ].includes( entity.type ) ) {
      const contextualizationId = entity.data.asset.id;
      const contextualization = production.contextualizations[contextualizationId];
      const contextualizer = production.contextualizers[contextualization.contextualizerId];
      if ( [ 'image', 'video', 'embed', 'table', 'vegaLite' ].includes( contextualizer.type ) ) {
        return [ ...res2, contextualizationId ];
      }
    }
    return res2;
  }, [] );

export const buildFiguresNumberMap = ( {
  production,
  sectionsIds,
  figuresPosition
} ) => {

  if ( figuresPosition === 'endOfContents' ) {
    const contextualizations = sectionsIds.reduce( ( res, sectionId ) => {
      const contents = production.resources[sectionId].data.contents;
      const mainContents = contents.contents;
      return [
        ...res,
        ...parseEligibleContextualizations( production, mainContents ),
        ...contents.notesOrder.reduce( ( res2, noteId ) => {
          const noteContents = contents.notes[noteId];
          return [ ...res2, ...parseEligibleContextualizations( production, noteContents ) ];
        }, [] )
      ];
    }, [] );

    const figuresNumberMap = contextualizations.reduce( ( res, contextualizationId, index ) => ( {
      ...res,
      [contextualizationId]: index + 1
    } ), {} );
    const figures = Object.keys( figuresNumberMap ).sort( ( c1, c2 ) => {
      const n1 = figuresNumberMap[c1];
      const n2 = figuresNumberMap[c2];
      if ( n1 < n2 ) {
        return -1;
      }
      else return 1;
    } )
    .map( ( contextualizationId ) => {
      return {
        contextualizationId,
        order: figuresNumberMap[contextualizationId]
      };
    } );

    return { figuresNumberMap, figures };
  }
  else if ( figuresPosition === 'endOfSections' ) {
    const figures = {};
    const figuresNumberMap = sectionsIds.reduce( ( res, sectionId ) => {

      const contents = production.resources[sectionId].data.contents;
      const mainContents = contents.contents;
      const contextualizations = [
        ...parseEligibleContextualizations( production, mainContents ),
        ...contents.notesOrder.reduce( ( res2, noteId ) => {
          const noteContents = contents.notes[noteId];
          return [ ...res2, ...parseEligibleContextualizations( production, noteContents ) ];
        }, [] )
      ];
      const sectionOrderMap = contextualizations.reduce( ( res2, contextualizationId, index ) => ( {
        ...res2,
        [contextualizationId]: index + 1
      } ), {} );

      figures[sectionId] = Object.keys( sectionOrderMap ).sort( ( c1, c2 ) => {
        const n1 = sectionOrderMap[c1];
        const n2 = sectionOrderMap[c2];
        if ( n1 < n2 ) {
          return -1;
        }
        else return 1;
      } )
      .map( ( contextualizationId ) => {
        return {
          contextualizationId,
          order: sectionOrderMap[contextualizationId]
        };
      } );

      return { ...res, ...sectionOrderMap };
    }, {} );
    return { figuresNumberMap, figures };
  }

  return {};
};
