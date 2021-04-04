import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'


import './Input.scss'

const Input = ({
  className,
  type,
  size,
  textRight,
  iconRight,
  name,
  value,
  disabled,
  invalid,
  onChange,
  ...restProps
}) => {
  const isNumber = type === 'number'
  const handleChange = event => {
    const { value: inputValue } = event.target
    onChange(event, !isNumber ? inputValue : inputValue.replace(/[^0-9.]/g, ''))
  }

  return (
    <div
      className={classNames('Input', {
        [`Input_${size}`]: size,
        Input_disabled: disabled,
        Input_invalid: invalid,
        Input_iconRight: iconRight,
        Input_textRight: textRight,
        [className]: className,
      })}
    >
      <input
        name={name}
        type={!isNumber ? type : 'text'}
        {...isNumber && {
          inputMode: 'numeric',
          pattern: '[0-9.]*',
        }}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        {...restProps}
      />
      {textRight && (
        <div className="Input-Text">
          {textRight}
        </div>
      )}

    </div>
  )
}

Input.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  iconRight: PropTypes.string,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([
    'lg',
    'md',
    'sm',
  ]),
  textRight: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Input.defaultProps = {
  type: 'text',
  size: 'md',
  autoComplete: 'off',
}

export default Input
