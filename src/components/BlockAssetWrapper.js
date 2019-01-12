/**
 * This module exports a stateless reusable block asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 */
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownPlayer from './MarkdownPlayer';

const BlockAssetWrapper = ( {
  data
}, context ) => {
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
  const resource = production.resources[contextualization.resourceId];
  const dimensions = context.dimensions || {};
  const fixedPresentationId = context.fixedPresentationId;
  // const onPresentationExit = context.onPresentationExit;
  const inNote = context.inNote;
  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];

  const Component = contextualizerModule && contextualizerModule.Block;

  if ( contextualization && Component ) {
    const hide = !visibility.paged;
    return hide ? null : (
      <figure
        className={ `block-contextualization-container ${ contextualizer.type}` }
        style={ {
          position: 'relative',
          minHeight: contextualizer.type === 'data-presentation' ? dimensions.height : '20px'
        } }
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
            <h4 className={ 'figure-title' }>
              <span>{contextualization.title || resource.metadata.title}</span>
            </h4>
          }
          {contextualization.legend &&
            <div className={ 'figure-legend' }>
              <MarkdownPlayer src={ contextualization.legend } />
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
  dimensions: PropTypes.object,

  /**
   * Id of the presentation being displayed full screen if any
   */
  fixedPresentationId: PropTypes.string,

  /**
   * Whether the block asset is displayed in a note (and not in main content)
   */
  inNote: PropTypes.bool,

  contextualizers: PropTypes.object,

  productionAssets: PropTypes.object,

  containerId: PropTypes.string,
};

export default BlockAssetWrapper;
