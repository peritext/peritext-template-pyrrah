"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  sectionId,
  target,
  children,
  className,
  id,
  style
}) => _react.default.createElement("a", {
  href: `#section-${sectionId}`,
  target: target,
  className: `page-link ${className}`,
  id: id,
  style: style
}, children, _react.default.createElement("span", null, "(p. "), _react.default.createElement("span", {
  className: 'page-link',
  href: `#section-${sectionId}`
}), _react.default.createElement("span", null, ")"));

exports.default = _default;