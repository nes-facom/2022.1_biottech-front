import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Previsao {
  async #getPrevisao(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/previsao/getPrevisoes.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getPrevisaoInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/previsao/getPrevisoes.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getPrevisoes(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getPrevisaoInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getPrevisao(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
  }

  #formatDate(data) {
    data.previsao.map((previsao) => {
        previsao.retirada_data = Util.formatDateTable(previsao.retirada_data)
    })
    return data
  }

  getPrevisaoHeaders() {
    const columns = [
      { field: 'num_previsao', header: 'Número Previsão' },
      { field: 'retirada_num', header: 'Retirada Número' },
      { field: 'qtd_retirar', header: 'Quantidade a retirar' },
      { field: 'retirada_data', header: 'Data da Retirada' },
      { field: 'status', header: 'Status' },
      { field: 'totalRetirado', header: 'Total Retirado' }
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

export default new Previsao()
