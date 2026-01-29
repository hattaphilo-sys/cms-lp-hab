/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@/payload.config'
import { RootPage, generatePageMetadata as generatePayloadMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async (args: Args): Promise<Metadata> =>
  generatePayloadMetadata({ config, ...args })

const Page = (args: Args) => RootPage({ config, importMap, ...args })

export default Page
