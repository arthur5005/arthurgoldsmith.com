import Head from 'next/head'
import dynamic from 'next/dynamic'

const SiteTerminal = dynamic(() => import('../components/site-terminal'), { ssr: false });

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/css/xterm.css" rel="stylesheet" type="text/css"></link>
      </Head>

      <main>
        <SiteTerminal/>
      </main>
    </div>
  )
}
