export default class Linhagem {
  async getLinhagem() {
    const res = await fetch('data/biot-data/linhagem.json')
    const d = await res.json()
    return d.linhagens
  }

  getLinhagemHeaders() {
    const columns = [{ field: 'nome_linhagem', header: 'Nome Linhagem' }]
    return columns
  }

  // getLinhagem() {
  //   return fetch(
  //     'http://localhost/biottech-back/api/linhagem/getLinhagemTable.json'
  //   )
  //     .then((res) => res.json())
  //     .then((d) => d.data)
  // }

  // getLinhagem(page, limit) {
  //   return fetch(
  //     'http://localhost/biottech-back/api/linhagem/getLinhagensTable.json?page=' +
  //       page +
  //       '&limit=' +
  //       limit
  //   )
  //     .then((res) => res.json())
  //     .then((d) => d.data)
  // }
}
