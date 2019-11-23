"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InternalLink = ({
  sectionId,
  children
}, {
  containerId
}) => _react.default.createElement("a", {
  href: `#section-${containerId}-${sectionId}`,
  className: 'internal-link'
}, children, _react.default.createElement("span", null, "(p. "), _react.default.createElement("span", {
  className: 'page-link',
  href: `#section-${containerId}-${sectionId}`
}), _react.default.createElement("span", null, ")"));

InternalLink.contextTypes = {
  containerId: _propTypes.default.string
};
var _default = InternalLink;
exports.default = _default;