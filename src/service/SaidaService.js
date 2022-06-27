import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class SaidaService {
  async #getSaida(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/saida/getSaidas.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getSaidaInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/saida/getSaidas.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getSaidas(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getSaidaInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getSaida(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
  }

  saveSaida(saida, onSave, onError) {
    saida = JSON.parse(JSON.stringify(saida))
    saida.data_saida = Util.formatDate(new Date(saida.data_saida))
    if (saida.caixa.caixa_numero) {
      saida.caixa_numero = saida.caixa.caixa_numero
      delete saida.caixa
    }

    if (saida.previsao.num_previsao) {
      saida.num_previsao = saida.previsao.num_previsao
      delete saida.previsao
    }

    axios
      .post(
        `${API_ENDPOINT}/saida/addSaida.json`,
        saida,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editSaida(saida, onSave, onError) {
    saida = JSON.parse(JSON.stringify(saida))

    if (saida.data_saida.includes('/')) {
      var newdata = saida.data_saida.split('/')
      saida.data_saida = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      saida.data_saida = Util.formatDate(new Date(saida.data_saida))
    }
    if (saida.caixa.caixa_numero) {
      saida.caixa_numero = saida.caixa.caixa_numero
      delete saida.caixa
    }

    if (saida.previsao.num_previsao) {
      saida.num_previsao = saida.previsao.num_previsao
      delete saida.previsao
    }

    console.log(saida)

    axios
      .put(
        `${API_ENDPOINT}/saida/editSaida.json?id=${saida.id}`,
        saida,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisableSaida(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/saida/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  #formatDate(data) {
    data.saida.map((saida) => {
      saida.data_saida = Util.formatDateTable(saida.data_saida)
    })
    return data
  }

  getSaidaHeaders() {
    const columns = [
      { field: 'data_saida', header: 'Data Saída' },
      { field: 'tipo_saida', header: 'Tipo Saída' },
      { field: 'usuario', header: 'Usuário' },
      { field: 'num_animais', header: 'Número Animais' },
      { field: 'saida', header: 'Saída' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'sobra', header: 'Sobra' },
      { field: 'observacoes', header: 'Observações' },
      { field: 'previsao.num_previsao', header: 'Previsão' },
      { field: 'caixa.caixa_numero', header: 'Caixa' }
    ]
    return columns
  }

  getCaixa(search, onFetch, onError) {
    axios
      .get(
        `${API_ENDPOINT}/caixa/getCaixa.json?search=${search}&active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
      .catch((e) => onError(e))
  }

  getPrevisao(search, onFetch, onError) {
    axios
      .get(
        `${API_ENDPOINT}/previsao/getPrevisao.json?search=${search}&active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
      .catch((e) => onError(e))
  }

  buildAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }
}

export default new SaidaService()
