
"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { use } from 'react'
type QueryProviderProps = {
  children: React.ReactNode
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [query] = React.useState(() => new QueryClient())

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>
}

export default QueryProvider
