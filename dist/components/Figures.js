"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BlockAssetWrapper = _interopRequireDefault(require("./BlockAssetWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Figures extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getChildContext", () => ({
      figuresPosition: 'inBody',
      production: this.props.production,
      figuresNumberMap: this.props.figuresNumberMap
    }));

    _defineProperty(this, "render", () => {
      const {
        figures = [],
        containerId,
        production,
        id
      } = this.props;
      return figures.length ? _react.default.createElement("section", {
        className: 'end-figures',
        id: `end-figures-${containerId}-${id}`
      }, _react.default.createElement("h2", {
        className: 'end-figures-title'
      }, "Figures"), _react.default.createElement("ul", {
        className: 'figures-list'
      }, figures.filter(figure => {
        const contextualization = production && production.contextualizations && production.contextualizations[figure.contextualizationId];

        if (!contextualization) {
          return false;
        }

        const {
          visibility = {
            screened: true,
            paged: true
          }
        } = contextualization;

        if (!visibility.paged) {
          return false;
        }

        return true;
      }).map(({
        contextualizationId
      }, index) => {
        return _react.default.createElement("li", {
          id: `end-figure-container-${contextualizationId}`,
          className: 'end-figure-container',
          key: index
        }, _react.default.createElement(_BlockAssetWrapper.default, {
          data: {
            asset: {
              id: contextualizationId
            }
          },
          displayFigureNumber: true
        }));
      }))) : null;
    });
  }

}

exports.default = Figures;

_defineProperty(Figures, "childContextTypes", {
  figuresPosition: _propTypes.default.object,
  production: _propTypes.default.object,
  figuresNumberMap: _propTypes.default.object
});