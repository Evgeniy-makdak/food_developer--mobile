
import React from 'react'

interface InputProps {
  type: string
  className: string
  style: React.CSSProperties
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  text: string
}

export default function Input({ type, className, style, value, onChange, disabled, text }: InputProps) {
  return (
    <input
      type={type}
      className={className}
      style={style}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={text}
    />
  )
}
