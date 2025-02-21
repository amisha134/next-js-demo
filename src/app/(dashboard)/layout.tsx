import React from 'react'
import { ChildrenType } from '@/types'
import DashboardLayout from '@/components/layout/Dashboard'

const Layout = ({ children }: ChildrenType) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default Layout