import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class TemperaturaUmidade {
  async #getTemperaturaUmidade(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/temperaturaUmidade/getTemperaturaUmidadeTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getTemperaturaUmidadeInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/temperaturaUmidade/getTemperaturaUmidadeTable.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getTemperaturaUmidade(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getTemperaturaUmidadeInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getTemperaturaUmidade(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
  }

  #formatDate(data) {
    data.temperatura.map((temperatura) => {
        temperatura.data = Util.formatDateTable(temperatura.data)
    })
    return data
  }

  getTemperaturaUmidadeHeaders() {
    const columns = [
      { field: 'data', header: 'Data' },
      { field: 'temp_matutino', header: 'Temperatura Matutino' },
      { field: 'ur_matutino', header: 'UR Matutino' },
      { field: 'temp_vespertino', header: 'Temperatura Vespertino' },
      { field: 'ur_vespertino', header: 'UR Vespertino' },
      { field: 'observacoes', header: 'Observações' },
      { field: 'sala.num_sala', header: 'Número da Sala' }
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

export default new TemperaturaUmidade()