'use client'
import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { SnackbarProvider } from 'notistack'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from '@/redux/store'
import theme from '@/theme'
import type { ChildrenType } from '@/types'

const ProvidersWrapper = ({ children }: ChildrenType) => {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) storeRef.current = makeStore()

  return (
    <Provider store={storeRef.current}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  )
}

export default ProvidersWrapper
