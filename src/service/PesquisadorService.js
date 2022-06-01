import AuthService from "./AuthService";
import axios from "axios";
import { API_ENDPOINT } from "../constants";


export default class Pesquisador {
  async getPesquisador() {
    return axios.get(`${API_ENDPOINT}/pesquisador/getPesquisadorTable.json?page=1&limit=10&active=true&search=`, this.buildAuthHeader())
  }

  async getPesquisadorInactive() {
    return axios.get(`${API_ENDPOINT}/pesquisador/getPesquisadorTable.json?page=1&limit=10&active=false&search=`, this.buildAuthHeader())
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


  buildAuthHeader() {
    return {
      headers: {
        'Authorization': `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }
}
