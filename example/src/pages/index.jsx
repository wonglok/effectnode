import { EffectNode } from 'effectnode'

//
const Page = (props) => {
  return (
    <>
      <EffectNode></EffectNode>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
