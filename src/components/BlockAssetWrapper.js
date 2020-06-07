/**
 * This module exports a stateless reusable block asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 */
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownPlayer from './MarkdownPlayer';

const BlockAssetWrapper = ( {
  data,
  displayFigureNumber
}, context ) => {
  const {
    figuresPosition = 'endOfSections',
    figuresNumberMap = {},
  } = context;
  const assetId = data.asset.id;
  const contextualization = context.production && context.production.contextualizations && context.production.contextualizations[assetId];
  if ( !contextualization ) {
    return null;
  }
  const {
    visibility = {
        screened: true,
        paged: true
      }
  } = contextualization;
  const production = context.production || {};
  const containerId = context.containerId;
  const assets = context.productionAssets || {};
  const contextualizer = production.contextualizers[contextualization.contextualizerId];
  const resource = production.resources[contextualization.sourceId];
  const { metadata = {} } = resource;
  const {
    authors = [],
    source,
    // description
  } = metadata;
  // const dimensions = context.dimensions || {};
  const fixedPresentationId = context.fixedPresentationId;
  // const onPresentationExit = context.onPresentationExit;
  const inNote = context.inNote;
  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];

  let Component = contextualizerModule && contextualizerModule.Block;

  if ( figuresPosition !== 'inBody' && [ 'table', 'source-code' ].includes( contextualizer.type ) ) {
    Component = () => <div className={ 'block-contextualization-placeholder' } />;
  }

  if ( contextualization && Component ) {
    const hide = !visibility.paged;
    return hide ? null : (
      <figure
        className={ `block-contextualization-container ${figuresPosition !== 'inBody' ? 'pagedjs_no-page-overflow-y' : ''} ${ contextualizer.type}` }
        id={ `contextualization-${containerId}-${assetId}` }
      >
        <Component
          resource={ resource }
          contextualizer={ contextualizer }
          contextualization={ contextualization }
          renderingMode={ 'paged' }
          assets={ assets }

          fixed={ fixedPresentationId === assetId }
          allowInteractions={ inNote || fixedPresentationId === assetId }
        />
        <figcaption className={ 'figure-caption' }>
          {
            figuresPosition === 'inBody' ?
              <div>
                <h4 className={ 'figure-title' }>
                  {
                    displayFigureNumber &&
                    <span>
                      <span>Figure {figuresNumberMap[contextualization.id]} (</span>
                      <span>
                        <a
                          className={ 'page-link' }
                          href={ `#figure-pointer-${contextualization.id}` }
                        >
                          p.
                        </a>
                      </span>
                      <span>). </span>
                    </span>
                  }
                  <span>{contextualization.title || resource.metadata.title}</span>
                </h4>
                {contextualization.legend &&
                  <div className={ 'figure-legend' }>
                    <MarkdownPlayer src={ contextualization.legend } />
                  </div>
                }
                {
                  source ?
                    <div className={ 'source' }>
                      {context.translate( 'Source' )}: {source}
                    </div>
                  : null
                }
                {
                  authors && authors.length ?
                    <div className={ 'authors' }>
                      {context.translate( 'Authors' )}{': '}
                      {
                    authors
                    .map( ( { family, given, affiliation }, index ) => (
                      <span
                        key={ index }
                        className={ 'author' }
                      >{given} {family}{affiliation ? ` (${affiliation})` : ''}
                      </span>
                    ) )
                    .reduce( ( cur, next, index ) => [ ...cur, index === 0 ? null : ', ', next ], [] )
                  }.
                    </div>
                  : null
                }
              </div>
            :
              <div>
                <h4 className={ 'figure-title' }>
                  <span id={ `figure-pointer-${contextualization.id}` }>
                    fig. {figuresNumberMap[contextualization.id]}
                  </span>
                  <span> (</span>
                  <span>
                    <a
                      className={ 'page-link' }
                      href={ `#end-figure-container-${contextualization.id}` }
                    >p.
                    </a>
                  </span>
                  <span>)</span>
                </h4>
              </div>
          }

        </figcaption>
      </figure>
    );
  }
  else {
    return null;
  }
};

/**
 * Component's properties types
 */
BlockAssetWrapper.propTypes = {

  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: PropTypes.shape( {
    asset: PropTypes.shape( {
      id: PropTypes.string
    } )
  } )
};

/**
 * Component's context used properties
 */
BlockAssetWrapper.contextTypes = {

  /**
   * The active production data
   */
  production: PropTypes.object,

  /**
   * Dimensions of the wrapping element
   */
  // dimensions: PropTypes.object,

  /**
   * Whether the block asset is displayed in a note (and not in main content)
   */
  inNote: PropTypes.bool,

  contextualizers: PropTypes.object,

  productionAssets: PropTypes.object,

  containerId: PropTypes.string,

  figuresPosition: PropTypes.string,
  figuresNumberMap: PropTypes.object,
  translate: PropTypes.func,
};

export default BlockAssetWrapper;
