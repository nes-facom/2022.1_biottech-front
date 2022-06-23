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

  savePrevisao(previsao, onSave, onError) {
    previsao = JSON.parse(JSON.stringify(previsao))
    previsao.retirada_data = Util.formatDate(new Date(previsao.retirada_data))
    previsao.status = previsao.status.value.toLowerCase()
    console.log(previsao)
    axios
      .post(
        `${API_ENDPOINT}/previsao/addPrevisao.json`,
        previsao,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisablePrevisao(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/previsao/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
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
