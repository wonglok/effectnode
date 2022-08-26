// import { useRouter } from 'next/router'
// import useStore from '@/helpers/store'
// import { useEffect } from 'react'
import Header from '@/config'
import '@/styles/index.css'
// import dynamic from 'next/dynamic'

// const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
//   ssr: false,
// })

function App({ Component, pageProps = { title: 'index' } }) {
  // const router = useRouter()

  return (
    <>
      <Header title={pageProps.title} />
      <Component {...pageProps} />

      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          zIndex: 10,
        }}
        id='myroot'
      ></span>
    </>
  )
}

export default App
