import { useRouter } from "next/router"

const withRouter = (Page) => {
  return (props) => {
    const router = useRouter()

    if (!router.isReady) {
      return (<div />)
    }

    return <Page {...props} router={router} />
  }
}

export default withRouter