export default class Pesquisador {
  getPesquisador() {
    return fetch('data/biot-data/pesquisador.json')
      .then((res) => res.json())
      .then((d) => d.pesquisador)
  }

  getPesquisadorHeaders() {
    const columns = [
      { field: 'nome', header: 'Nome' },
      { field: 'instituicao', header: 'Instituição' },
      { field: 'setor', header: 'Setor' },
      { field: 'ramal', header: 'Ramal' },
      { field: 'email', header: 'Email' },
      { field: 'orientador', header: 'Orientador' },
      { field: 'pedido', header: 'Pedido' },
      { field: 'telefone', header: 'Telefone' }
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
  //     'http://localhost/biottech-back/api/pedido/getPedidosTable.json?page=' +
  //       page +
  //       '&limit=' +
  //       limit
  //   )
  //     .then((res) => res.json())
  //     .then((d) => d.data)
  // }
}
