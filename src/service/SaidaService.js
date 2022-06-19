import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Parto {
  async #getParto(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/parto/getPartos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getPartoInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/parto/getPartos.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getPartos(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getPartoInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getParto(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
  }

  #formatDate(data) {
    data.partos.map((partos) => {
        partos.data_parto = Util.formatDateTable(partos.data_parto)
    })
    return data
  }

 getSaidaHeaders() {
    const columns = [
      { field: 'data_saida', header: 'a' },
      { field: 'tipo_saida', header: 'a' },
      { field: 'usuario', header: 'a' },
      { field: 'num_animais', header: 'a' },
      { field: 'saida', header: 'a' },
      { field: 'sexo', header: 'a' },
      { field: 'sobra', header: 'a' },
      { field: 'observacoes', header: 'a' },
      { field: 'previsao[0].', header: 'a' }
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

export default new Parto()
