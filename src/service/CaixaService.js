import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Caixa {
  async #getCaixa(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixa/getCaixas.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getCaixaInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixa/getCaixas.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getCaixas(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getCaixaInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getCaixa(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
  }

  #formatDate(data) {
    data.caixas.map((caixa) => {
      caixa.nascimento = Util.formatDateTable(caixa.nascimento)
    })
    return data
  }

  getCaixaHeaders() {
    const columns = [
      { field: 'caixa_numero', header: 'Número da Caixa' },
      { field: 'linhagem.nome_linhagem', header: 'Linhagem' },
      { field: 'nascimento', header: 'Data de Nascimento' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'num_animais', header: 'Número de animais' },
      { field: 'qtd_saida', header: 'Quantidade Saída' },
      { field: 'ultima_saida', header: 'Última Saída' }
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

export default new Caixa()
