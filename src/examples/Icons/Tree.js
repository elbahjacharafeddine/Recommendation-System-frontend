/**
 * Soft UI Dashboard React - v4.0.0
 */

import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Tree({ color, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill={colors[color] ? colors[color].light : colors.light.main}
          d="M26.388 39.288c-.113.304-.376.495-.667.495H16.278c-.29 0-.554-.191-.667-.495L10.042 29.42h21.834l-5.488 9.868z"
        />
        <path
          fill={colors[color] ? colors[color].main : colors.dark.main}
          d="M32.226 23.437h-6.25v-6.25h-6.25v6.25h-6.25v6.25h6.25v6.25h6.25v-6.25h6.25v-6.25zm2.083 0v6.25c0 .693-.56 1.25-1.25 1.25h-1.786v5.417c0 .693-.56 1.25-1.25 1.25h-6.25c-.69 0-1.25-.557-1.25-1.25v-5.417h-1.786c-.69 0-1.25-.557-1.25-1.25v-6.25c0-.69.56-1.25 1.25-1.25h11.46c.69 0 1.25.56 1.25 1.25zm-4.166 0h-2.084v-2.084h2.084v2.084z"
        />
      </g>
    </svg>
  );
}

Tree.defaultProps = {
  color: "dark",
  size: "16px",
};

Tree.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Tree;
