/* eslint-disable react/button-has-type */

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import './Button.scss'

const Button = ({ children, type, className, color, size, disabled, ...restProps }) => (
  <button
    className={classNames('Button', {
      [`Button_${size}`]: size,
      [`Button_${color}`]: color,
      Button_disabled: disabled,
      [className]: className,
    })}
    type={type}
    disabled={disabled}
    {...restProps}
  >
    {children}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'blue',
    'lightBlue',
    'outline',
    'transparent',
    'white',
    'grey',
    'red'
  ]),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    'md',
    'sm',
    'xs',
  ]),
  type: PropTypes.oneOf([
    'submit',
    'reset',
    'button',
  ]),
}

Button.defaultProps = {
  type: 'button',
  color: 'blue',
  size: 'sm',
}

export default Button
