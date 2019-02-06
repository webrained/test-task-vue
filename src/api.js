import Axios from 'axios'

const client = Axios.create({
  baseURL: 'http://localhost:3000/api/',
  json: true
})

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },

  // User Routes
  getClients() {
    return this.execute('get', 'clients')
  },
  getClient(id) {
    return this.execute('get', `client/${id}`)
  },
  addClient(obj) {
    return this.execute('post', 'clients', obj)
  },
  editClient(obj) {
    return this.execute('put', 'clients', obj)
  },
  deleteClient(id) {
    return this.execute('delete', `client/${id}`)
  },

  // Provider Routes
  getProviders() {
    return this.execute('get', 'providers')
  },
  addProvider(provider) {
    return this.execute('post', 'providers', provider)
  },
  editProvider(obj) {
    return this.execute('put', 'providers', obj)
  },
  deleteProvider(id) {
    return this.execute('delete', `provider/${id}`)
  }
}
