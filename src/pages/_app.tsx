import "../styles/global.scss"
import type { AppProps } from 'next/app'
import { Header } from "../components/Header"
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from "@prismicio/react"
import { PrismicPreview } from "@prismicio/next"
import Link from "next/link"
import { repositoryName } from "../services/prismic"

export default function App({
  Component,
  pageProps
}: AppProps) {
  return (
    <>
      <PrismicProvider internalLinkComponent={(props) => <Link {...props}/>}>
        <PrismicPreview repositoryName={repositoryName}>
          <SessionProvider session={pageProps.session} >
            <Header />
            <Component {...pageProps} />
          </SessionProvider>
        </PrismicPreview>
      </PrismicProvider>

    </>
  )
}
