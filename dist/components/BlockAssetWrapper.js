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
  data,
  displayFigureNumber
}, context) => {
  const {
    figuresPosition = 'endOfSections',
    figuresNumberMap = {}
  } = context;
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
  const {
    metadata = {}
  } = resource;
  const {
    authors = [],
    source // description

  } = metadata; // const dimensions = context.dimensions || {};

  const fixedPresentationId = context.fixedPresentationId; // const onPresentationExit = context.onPresentationExit;

  const inNote = context.inNote;
  const contextualizers = context.contextualizers;
  const contextualizerModule = contextualizers[contextualizer.type];
  let Component = contextualizerModule && contextualizerModule.Block;

  if (figuresPosition !== 'inBody' && ['table', 'source-code'].includes(contextualizer.type)) {
    Component = () => _react.default.createElement("div", {
      className: 'block-contextualization-placeholder pagedjs_no-page-overflow-y'
    });
  }

  if (contextualization && Component) {
    const hide = !visibility.paged;
    return hide ? null : _react.default.createElement("figure", {
      className: `block-contextualization-container ${figuresPosition !== 'inBody' ? 'pagedjs_no-page-overflow-y' : ''} ${contextualizer.type}`,
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
    }, figuresPosition === 'inBody' ? _react.default.createElement("div", null, _react.default.createElement("h4", {
      className: 'figure-title'
    }, displayFigureNumber && _react.default.createElement("span", null, _react.default.createElement("span", null, "Figure ", figuresNumberMap[contextualization.id], " ("), _react.default.createElement("span", null, _react.default.createElement("a", {
      className: 'page-link',
      href: `#figure-pointer-${contextualization.id}`
    }, "p.")), _react.default.createElement("span", null, "). ")), _react.default.createElement("span", null, contextualization.title || resource.metadata.title)), contextualization.legend && _react.default.createElement("div", {
      className: 'figure-legend'
    }, _react.default.createElement(_MarkdownPlayer.default, {
      src: contextualization.legend
    })), source ? _react.default.createElement("div", {
      className: 'source'
    }, context.translate('Source'), ": ", source) : null, authors && authors.length ? _react.default.createElement("div", {
      className: 'authors'
    }, authors.length > 1 ? context.translate('Authors') : context.translate('Author'), ': ', authors.map(({
      family,
      given,
      affiliation
    }, index) => _react.default.createElement("span", {
      key: index,
      className: 'author'
    }, given, " ", family, affiliation ? ` (${affiliation})` : '')).reduce((cur, next, index) => [...cur, index === 0 ? null : ', ', next], []), ".") : null) : _react.default.createElement("div", null, _react.default.createElement("h4", {
      className: 'figure-title'
    }, _react.default.createElement("span", {
      id: `figure-pointer-${contextualization.id}`
    }, "fig. ", figuresNumberMap[contextualization.id]), _react.default.createElement("span", null, " ("), _react.default.createElement("span", null, _react.default.createElement("a", {
      className: 'page-link',
      href: `#end-figure-container-${contextualization.id}`
    }, "p.")), _react.default.createElement("span", null, ")")))));
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
  // dimensions: PropTypes.object,

  /**
   * Whether the block asset is displayed in a note (and not in main content)
   */
  inNote: _propTypes.default.bool,
  contextualizers: _propTypes.default.object,
  productionAssets: _propTypes.default.object,
  containerId: _propTypes.default.string,
  figuresPosition: _propTypes.default.string,
  figuresNumberMap: _propTypes.default.object,
  translate: _propTypes.default.func
};
var _default = BlockAssetWrapper;
exports.default = _default;