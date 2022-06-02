import AuthService from "./AuthService";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import Util from "../util/Util";


class Pedido {
  async #getPedido(search, page, year) {
    return axios.get(`${API_ENDPOINT}/pedido/getPedidos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`, this.buildAuthHeader())
  }

  async #getPedidoInactive(search, page, year) {
    return axios.get(`${API_ENDPOINT}/pedido/getPedidos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`, this.buildAuthHeader())
  }

  getPedidos(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getPedidoInactive(search, page, year)
        .then(response => onFetch(this.formatDate(response.data)))
    } else {
      this.#getPedido(search, page, year)
        .then(response => onFetch(this.formatDate(response.data)))
    }
  }

  formatDate(data) {
    data.pedidos.map(
      pedido => {
        pedido.data_solicitacao = Util.formatDateTable(pedido.data_solicitacao),
          pedido.vigencia_ceua = Util.formatDateTable(pedido.vigencia_ceua)
      }
    )
    return data
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

  buildAuthHeader() {
    return {
      headers: {
        'Authorization': `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }
}

export default new Pedido()
