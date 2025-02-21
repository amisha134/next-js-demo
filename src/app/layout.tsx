import type { Metadata } from 'next'
import React from 'react'
import type { ChildrenType } from '@/types'
import ProvidersWrapper from '@/components/ProvidersWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Beauty',
    template: '%s | Beauty',
  },
  description: 'Encyclopedia of Beauty Show',
}

const RootLayout = ({ children }: ChildrenType) => {
  return (
    <html lang="en">
      <body className={'geistSans.variable'}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  )
}

export default RootLayout
