class RouteBuilder {
  constructor() {
    const getEmptyHandler = () => async (req, res) => {
      throw new Error("Method not implemented.")
    }

    this.postHandler = getEmptyHandler(),
    this.getHandler = getEmptyHandler(),
    this.putHandler = getEmptyHandler(),
    this.deleteHandler = getEmptyHandler()
  }

  get(handler) {
    this.getHandler = handler
    return this
  }

  post(handler) {
    this.postHandler = handler
    return this
  }

  put(handler) {
    this.putHandler = handler
    return this
  }

  delete(handler) {
    this.deleteHandler = handler
    return this
  }

  build() {
    return async (req, res) => {
      switch(req.method) {
        case "GET":
          return await this.getHandler(req, res)
        case "POST":
          return await this.postHandler(req, res)
        case "PUT":
          return await this.putHandler(req, res)
        case "DELETE":
          return await this.deleteHandler(req, res)
      }
    }
  }
}

export default RouteBuilder