export default class Pesquisador {
  getPesquisador() {
    return fetch('data/biot-data/pesquisador.json')
      .then((res) => res.json())
      .then((d) => d.data)
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
}
