"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Authors = ({
  authors,
  displayRole = false
}) => authors.map((author = {}, index) => _react.default.createElement("span", {
  className: "author'",
  key: index
}, author.given && author.given.trim(), " ", author.family && author.family.trim(), displayRole && author.role ? ` (${author.role})` : '')).reduce((prev, curr, index) => {
  if (index > 0) {
    return [prev, ', ', curr];
  }

  return [curr];
}, []);

var _default = Authors;
exports.default = _default;