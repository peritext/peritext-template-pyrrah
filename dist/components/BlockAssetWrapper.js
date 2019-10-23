"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MarkdownPlayer = _interopRequireDefault(require("./MarkdownPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable block asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 */
const BlockAssetWrapper = ({
  data
}, context) => {
  const assetId = data.asset.id;
  const contextualization = context.production && context.production.contextualizations && context.production.contextualizations[assetId];

  if (!contextualization) {
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
  const dimensions = context.dimensions || {};
  const fixedPresentationId = context.fixedPresentationId; // const onPresentationExit = context.onPresentationExit;

  const inNote = context.inNote;
  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];
  const Component = contextualizerModule && contextualizerModule.Block;

  if (contextualization && Component) {
    const hide = !visibility.paged;
    return hide ? null : _react.default.createElement("figure", {
      className: `block-contextualization-container ${contextualizer.type}`,
      style: {
        position: 'relative',
        minHeight: contextualizer.type === 'data-presentation' ? dimensions.height : '20px'
      },
      id: `contextualization-${containerId}-${assetId}`
    }, _react.default.createElement(Component, {
      resource: resource,
      contextualizer: contextualizer,
      contextualization: contextualization,
      renderingMode: 'paged',
      assets: assets,
      fixed: fixedPresentationId === assetId,
      allowInteractions: inNote || fixedPresentationId === assetId
    }), _react.default.createElement("figcaption", {
      className: 'figure-caption'
    }, _react.default.createElement("h4", {
      className: 'figure-title'
    }, _react.default.createElement("span", null, contextualization.title || resource.metadata.title)), contextualization.legend && _react.default.createElement("div", {
      className: 'figure-legend'
    }, _react.default.createElement(_MarkdownPlayer.default, {
      src: contextualization.legend
    }))));
  } else {
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
  data: _propTypes.default.shape({
    asset: _propTypes.default.shape({
      id: _propTypes.default.string
    })
  })
};
/**
 * Component's context used properties
 */

BlockAssetWrapper.contextTypes = {
  /**
   * The active production data
   */
  production: _propTypes.default.object,

  /**
   * Dimensions of the wrapping element
   */
  dimensions: _propTypes.default.object,

  /**
   * Id of the presentation being displayed full screen if any
   */
  fixedPresentationId: _propTypes.default.string,

  /**
   * Whether the block asset is displayed in a note (and not in main content)
   */
  inNote: _propTypes.default.bool,
  contextualizers: _propTypes.default.object,
  productionAssets: _propTypes.default.object,
  containerId: _propTypes.default.string
};
var _default = BlockAssetWrapper;
exports.default = _default;