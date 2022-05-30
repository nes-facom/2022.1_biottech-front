export default class Pedido {
  async getPedido() {
    const res = await fetch('data/biot-data/pedido.json')
    const data = await res.json()
    return data.pedidos
  }

  getPedidoHeaders() {
    const columns = [
      { field: 'processo_sei', header: 'Sei' },
      { field: 'pesquisador.nome', header: 'Pesquisador' },
      { field: 'data_solicitacao', header: 'Solicitação' },
      { field: 'num_ceua', header: 'Ceua' },
      { field: 'vigencia_ceua', header: 'Vigência' },
      { field: 'num_aprovado', header: 'N°Aprovados' },
      { field: 'num_solicitado', header: 'N°Solicitado' },
      { field: 'saldoCEUA', header: 'Saldo CEUA' },
      { field: 'linhagem.nome_linhagem', header: 'Linhagem' }
    ]
    return columns
  }

  // getPedido() {
  //   return fetch(
  //     'http://localhost/biottech-back/api/pedido/getPedidoTable.json'
  //   )
  //     .then((res) => res.json())
  //     .then((d) => d.data)
  // }

  // getPedido(page, limit) {
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
