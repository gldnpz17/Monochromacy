const withLayout = (Page, Layout) => {
  const component = (props) => {
    return (
      <Layout>
        <Page {...props} />
      </Layout>
    )
  }

  return component
}

export default withLayout