/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@/payload.config'
import '@payloadcms/next/css'
import { handleServerFunctions } from '@payloadcms/next/server'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'

import React from 'react'

type Args = {
  children: React.ReactNode
  params: Promise<{ segments: string[] }>
}

const Layout = async (args: Args) => {
  const { children, params } = args
  return (
    <RootLayout config={config} importMap={importMap} params={params}>
      {children}
    </RootLayout>
  )
}

export default Layout
