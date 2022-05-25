import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { getIdentity } from "../api-requests/auth"

const withAuthentication = (Page) => {
  const component = (props) => {
    const router = useRouter()

    const { isLoading, data } = useQuery(["auth", "identity"], getIdentity)

    if (!router.isReady || isLoading) return <div />

    if (data.account === null) {
      router.push("/admin/login")

      return <div />
    } else {
      return (
        <Page {...props} />
      )
    }
  }

  return component
}

export default withAuthentication