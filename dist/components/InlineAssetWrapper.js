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
    containerId
  } = context;
  const assetId = data.asset && data.asset.id;

  if (!assetId || !production) {
    return null;
  }

  const contextualization = production.contextualizations[assetId];

  if (!contextualization) {
    return null;
  }

  const contextualizer = production.contextualizers[contextualization.contextualizerId];
  const resource = production.resources[contextualization.resourceId];
  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];
  const Component = contextualizerModule && contextualizerModule.Inline;

  if (contextualizer && Component) {
    /**
     * @todo this is a fix for a rendering bug
     */
    if (contextualizer.type === 'glossary') {
      return _react.default.createElement("span", {
        id: `contextualization-${containerId}-${assetId}`
      }, children);
    }

    return _react.default.createElement("span", {
      className: `inline-contextualization-container ${contextualizer.type}`,
      id: `contextualization-${containerId}-${assetId}`
    }, _react.default.createElement(Component, {
      contextualization: contextualization,
      contextualizer: contextualizer,
      resource: resource,
      renderingMode: 'paged'
    }, children));
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
  containerId: _propTypes.default.string
};
var _default = InlineAssetWrapper;
exports.default = _default;