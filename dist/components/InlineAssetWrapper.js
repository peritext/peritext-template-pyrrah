"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InlineAssetWrapper = ({
  data,
  children
}, context) => {
  const {
    production,
    containerId,
    figuresPosition,
    figuresNumberMap = {}
  } = context;
  const assetId = data.asset && data.asset.id;

  if (!assetId || !production) {
    return null;
  }

  const contextualization = production.contextualizations[assetId];

  if (!contextualization) {
    return null;
  }

  const assets = context.productionAssets || {};
  const contextualizer = production.contextualizers[contextualization.contextualizerId];
  const resource = production.resources[contextualization.sourceId];
  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];
  const Component = contextualizerModule && contextualizerModule.Inline;

  if (contextualizer && Component) {
    /**
     * @todo this is a fix for a rendering bug
     */
    if (contextualizer.type === 'glossary') {
      return _react.default.createElement("a", {
        id: `contextualization-${containerId}-${assetId}`,
        href: `#glossary-item-${resource.id}`,
        className: 'glossary-mention'
      }, children);
    }

    return _react.default.createElement("span", {
      className: `inline-contextualization-container ${contextualizer.type}`,
      id: `contextualization-${containerId}-${assetId}`
    }, figuresPosition !== 'inBody' && ['image', 'embed'].includes(contextualizer.type) && figuresNumberMap[contextualization.id] !== undefined ? _react.default.createElement("span", {
      className: 'figure-pointer'
    }, `(fig. ${figuresNumberMap[contextualization.id]} `, _react.default.createElement("span", null, _react.default.createElement("a", {
      className: 'page-link',
      href: `#end-figure-container-${contextualization.id}`
    }, "p."))) : null, _react.default.createElement(Component, {
      contextualization: contextualization,
      contextualizer: contextualizer,
      resource: resource,
      renderingMode: 'paged',
      assets: assets
    }, children), figuresPosition !== 'inBody' && ['image', 'embed'].includes(contextualizer.type) ? ')' : null);
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
  data: _propTypes.default.shape({
    asset: _propTypes.default.shape({
      id: _propTypes.default.string
    })
  })
};
/**
 * Component's context used properties
 */

InlineAssetWrapper.contextTypes = {
  production: _propTypes.default.object,
  contextualizers: _propTypes.default.object,
  containerId: _propTypes.default.string,
  productionAssets: _propTypes.default.object,
  figuresPosition: _propTypes.default.string,
  figuresNumberMap: _propTypes.default.object
};
var _default = InlineAssetWrapper;
exports.default = _default;