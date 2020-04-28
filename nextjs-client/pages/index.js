import Head from 'next/head'
import dynamic from 'next/dynamic'

const SiteTerminal = dynamic(() => import('../components/site-terminal'), { ssr: false });

const mainStyle = {
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  height: '100vh'
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/css/xterm.css" rel="stylesheet" type="text/css"></link>
        <link href="/css/app.css" rel="stylesheet" type="text/css"></link>
        <meta name="viewport" content="width=600"></meta>
      </Head>

      <main style={mainStyle}>
        <SiteTerminal/>
      </main>
    </div>
  )
}
