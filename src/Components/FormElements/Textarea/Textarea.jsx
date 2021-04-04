import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './Textarea.scss'

const Textarea = ({
  children,
  className,
  size,
  value,
  maxLength,
  invalid,
  disabled,
  onChange,
  placeholder,
  ...restProps
}) => {
  const handleChange = event => onChange(event, event.target.value)

  return (
    <div
      className={classNames('Textarea', {
        [`Textarea_${size}`]: size,
        [className]: className,
        Textarea_invalid: invalid,
        Textarea_disabled: disabled,
      })}
    >

      <textarea
        className="area"
        wrap="on"
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  )
}

Textarea.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.oneOf([
    'lg',
    'md',
    'sm',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Textarea.defaultProps = {
  size: 'md',
  autoComplete: 'off',
}

export default Textarea
