import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center/Center'
import Player from '../components/Player/Player'
import Sidebar from '../components/sidebar/sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden ">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="https://www.pngall.com/wp-content/uploads/9/Spotify-Logo.png" />
      </Head>
      <main className=' flex flex-row'>
        <Sidebar />
        {/* { Center } */}
        <Center />
      </main>
      <div className=' sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}