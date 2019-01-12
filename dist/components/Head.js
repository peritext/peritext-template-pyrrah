"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHelmet = require("react-helmet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  pageTitle,
  authors = [],
  tags = [],
  description = '',
  url = ''
}) => {
  const authorsStr = authors.map(author => `${author.given} ${author.family}`).join(', ');
  return _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, pageTitle), _react.default.createElement("meta", {
    name: 'generator',
    content: 'peritext'
  }), _react.default.createElement("meta", {
    name: 'DC.Title',
    lang: 'fr',
    content: pageTitle
  }), _react.default.createElement("meta", {
    name: 'DC.Date.created',
    schema: 'W3CDTF',
    content: new Date().toISOString()
  }), _react.default.createElement("meta", {
    name: 'author',
    content: authorsStr
  }), _react.default.createElement("meta", {
    name: 'keywords',
    content: tags.join(',')
  }), _react.default.createElement("meta", {
    name: 'description',
    content: description
  }), _react.default.createElement("meta", {
    name: 'viewport',
    content: 'user-scalable=no,width=device-width'
  }), _react.default.createElement("meta", {
    name: 'twitter:card',
    value: 'summary'
  }), _react.default.createElement("meta", {
    name: 'twitter:site',
    content: url
  }), _react.default.createElement("meta", {
    name: 'twitter:title',
    content: pageTitle
  }), _react.default.createElement("meta", {
    name: 'twitter:description',
    content: description
  }), _react.default.createElement("meta", {
    itemProp: 'name',
    content: pageTitle
  }), _react.default.createElement("meta", {
    itemProp: 'description',
    content: description
  }), _react.default.createElement("meta", {
    property: 'og:title',
    content: pageTitle
  }), _react.default.createElement("meta", {
    property: 'og:type',
    content: 'website'
  }), _react.default.createElement("meta", {
    property: 'og:url',
    content: url
  }), _react.default.createElement("meta", {
    property: 'og:description',
    content: description
  }));
};

exports.default = _default;