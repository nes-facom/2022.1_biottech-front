export default class Pesquisador {
  async getPesquisador() {
    const res = await fetch('data/biot-data/pesquisador.json')
    const data = await res.json()
    return data.pesquisador
  }

  async getPesquisadorInactive() {
    const res = await fetch('data/biot-data/pesquisadorInactive.json')
    const data = await res.json()
    return data.pesquisador
  }

  getPesquisadorHeaders() {
    const columns = [
      { field: 'nome', header: 'Nome' },
      { field: 'instituicao', header: 'Instituição' },
      { field: 'setor', header: 'Setor' },
      { field: 'pos', header: 'Pos' },
      { field: 'ramal', header: 'Ramal' },
      { field: 'email', header: 'Email' },
      { field: 'telefones', header: 'Telefone' }
    ]
    return columns
  }

  // getPesquisador() {
  //   return fetch(
  //     'http://localhost/biottech-back/api/pesquisador/getPesquisadorTable.json'
  //   )
  //     .then((res) => res.json())
  //     .then((d) => d.data)
  // }

  // getPesquisador(page, limit) {
  //   return fetch(
  //     'http://localhost/biottech-back/api/pedido/getPesquisadorTable.json?page=' +
  //       page +
  //       '&limit=' +
  //       limit
  //   )
  //     .then((res) => res.json())
  //     .then((d) => d.data)
  // }
}
