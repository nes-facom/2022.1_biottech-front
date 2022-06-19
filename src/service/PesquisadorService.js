import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'

class Pesquisador {
  async #getPesquisador(search, page) {
    return axios.get(
      `${API_ENDPOINT}/pesquisador/getPesquisadores.json?page=${page}&limit=5&active=true&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getPesquisadorInactive(search, page) {
    return axios.get(
      `${API_ENDPOINT}/pesquisador/getPesquisadores.json?page=${page}&limit=5&active=false&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getPesquisadores(disable, page, search, onFetch) {
    if (disable) {
      this.#getPesquisadorInactive(search, page).then((response) =>
        onFetch(response.data)
      )
    } else {
      this.#getPesquisador(search, page).then((response) =>
        onFetch(response.data)
      )
    }
  }

  savePesquisador(pesquisador, phonesSave, onSave, onError) {
    var phones = []
    JSON.parse(JSON.stringify(phonesSave)).forEach(phone => {
      phones.push(phone.num)
    });
    pesquisador.telefones = phones;
    pesquisador = JSON.parse(JSON.stringify(pesquisador))
    axios.post(`${API_ENDPOINT}/pesquisador/addPesquisador.json`, pesquisador, this.buildAuthHeader())
    .then(() => onSave())
    .catch(e => onError(e));
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

  buildAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }
}

export default new Pesquisador()
