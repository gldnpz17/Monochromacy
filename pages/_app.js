import '../styles/globals.css'
import Head from "next/head"
import { QueryClientProvider, QueryClient } from 'react-query'
import { ModalProvider } from '../providers/modal-provider'

const client = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
        <QueryClientProvider client={client}>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </QueryClientProvider>
    </>
  )
}

export default MyApp
