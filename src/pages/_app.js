import Layouts from '@/components/layouts'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return  <Layouts>
    <Head>
      <title>Nextjs Ecommerce website</title>
    </Head>
    <Component {...pageProps} />
  </Layouts>
  }
