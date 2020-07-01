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
  // children,
  className,
  // MentionComponent,
  onePerPage,
  withoutP,
  id,
  style
}) => _react.default.createElement("a", {
  href: href,
  target: target,
  className: `page-link ${className || ''} ${onePerPage ? 'one-per-page' : ''}`,
  id: id,
  style: style
}, withoutP ? '' : 'p.');

exports.default = _default;