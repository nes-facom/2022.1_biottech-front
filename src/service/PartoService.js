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

 getPartoHeaders() {
    const columns = [
      { field: 'numero_parto', header: 'Número Parto' },
      { field: 'data_parto', header: 'Data Parto' },
      { field: 'num_macho', header: 'Número Machos' },
      { field: 'num_femea', header: 'Número Fêmeas' },
      { field: 'des_macho', header: 'Desmame Macho' },
      { field: 'des_femea', header: 'Desmame Fêmea' },
      { field: 'qtd_canib', header: 'Quantidade Canibalismo' },
      { field: 'qtd_gamba', header: 'Quantidade Gambá' },
      { field: 'qtd_outros', header: 'Quantidade Outros' }
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
