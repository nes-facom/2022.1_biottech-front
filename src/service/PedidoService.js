import AuthService from "./AuthService";
import axios from "axios";
import { API_ENDPOINT } from "../constants";


class Pedido {
  async #getPedido(search, page, year) {
    return axios.get(`${API_ENDPOINT}/pedido/getPedidos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`, this.buildAuthHeader())
  }

  async #getPedidoInactive(search, page, year) {
    return axios.get(`${API_ENDPOINT}/pedido/getPedidos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`, this.buildAuthHeader())
  }

  getPedidos(disable, page, search, onFetch) {
    if (disable) {
      this.#getPedidoInactive(search, page, new Date().getFullYear())
        .then(response => onFetch(response.data))
    } else {
      this.#getPedido(search, page, new Date().getFullYear())
        .then(response => onFetch(response.data))
    }
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
