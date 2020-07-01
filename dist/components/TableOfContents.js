"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TocElement = ({
  title,
  href,
  level = 0,
  children
}) => _react.default.createElement("li", {
  className: `table-of-contents-element level-${level}`
}, _react.default.createElement("span", {
  className: 'element-title'
}, _react.default.createElement("span", null, title), _react.default.createElement("span", {
  className: 'element-leading'
})), _react.default.createElement("a", {
  className: 'page-link',
  href: `#${href}`
}), children && children.length ? _react.default.createElement("ul", null, children.map((child, childIndex) => _react.default.createElement(TocElement, _extends({}, child, {
  key: childIndex
})))) : null);

var _default = ({
  tableOfContents,
  data: {
    customTitle,
    displayPageNumber
  } = {},
  translate
}) => _react.default.createElement("section", {
  className: `composition-block table-of-contents ${displayPageNumber ? 'has-page-number' : ''}`
}, _react.default.createElement("h2", {
  className: 'composition-block-title peritext-block-title'
}, customTitle && customTitle.trim().length ? customTitle : translate('Table of contents')), _react.default.createElement("ul", {
  className: 'table-of-contents-elements-container'
}, tableOfContents.filter(item => item.title.length).map((item, index) => {
  return _react.default.createElement(TocElement, {
    key: index,
    title: item.title,
    href: item.href,
    level: item.level
  });
})));

exports.default = _default;