
import React from 'react';
import PropTypes from 'prop-types';

const InlineAssetWrapper = ( {
  data,
  children
}, context ) => {
  const { production, containerId } = context;
  const assetId = data.asset && data.asset.id;
  if ( !assetId || !production ) {
    return null;
  }
  const contextualization = production.contextualizations[assetId];
  if ( !contextualization ) {
    return null;
  }
  const assets = context.productionAssets || {};


  const contextualizer = production.contextualizers[contextualization.contextualizerId];
  const resource = production.resources[contextualization.sourceId];

  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];

  const Component = contextualizerModule && contextualizerModule.Inline;
  if ( contextualizer && Component ) {

    /**
     * @todo this is a fix for a rendering bug
     */
    if ( contextualizer.type === 'glossary' ) {
      return (
        <span
          id={ `contextualization-${containerId}-${assetId}` }
        >{children}
        </span>
      );

    }
    return (
      <span
        className={ `inline-contextualization-container ${ contextualizer.type}` }
        id={ `contextualization-${containerId}-${assetId}` }
      >
        <Component
          contextualization={ contextualization }
          contextualizer={ contextualizer }
          resource={ resource }
          renderingMode={ 'paged' }
          assets={assets}
        >
          {children}
        </Component>
      </span>
    );
  }
  return null;
};

/**
 * Component's properties types
 */
InlineAssetWrapper.propTypes = {

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
InlineAssetWrapper.contextTypes = {
  production: PropTypes.object,
  contextualizers: PropTypes.object,
  containerId: PropTypes.string,
  productionAssets: PropTypes.object,
};

export default InlineAssetWrapper;
