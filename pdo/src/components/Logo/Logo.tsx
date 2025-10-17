import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div
      className={clsx('nanum-gothic-coding-regular', className)}
      style={{
        width: '123px',
        height: '42px',
        fontSize: '41px',
        lineHeight: '42px',
        fontWeight: 400,
        fontStyle: 'normal',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span className="logo-p0">PO</span>
      <span className="logo-arq">ARQ</span>
    </div>
  )
}
