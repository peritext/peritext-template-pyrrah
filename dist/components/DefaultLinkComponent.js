"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  href,
  target,
  children,
  className,
  id,
  style
}) => _react.default.createElement("a", {
  href: href,
  target: target,
  className: className,
  id: id,
  style: style
}, children);

exports.default = _default;