import { useRouter } from 'next/router'

const Slug = () => {
  const router = useRouter()
  const { slug } = router.query
  // console.log(router.query.slug)
  return <p> {slug}</p>
}

export default Slug