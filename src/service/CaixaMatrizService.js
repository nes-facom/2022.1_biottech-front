import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class CaixaMatrizService {
  async #getCaixaMatriz(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixaMatriz/getMatrizesTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getCaixaMatrizInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixaMatriz/getMatrizesTable.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getCaixaMatrizes(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getCaixaMatrizInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getCaixaMatriz(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
  }

  saveCaixa(caixa, onSave, onError) {
    caixa = JSON.parse(JSON.stringify(caixa))
    caixa.nascimento = Util.formatDate(new Date(caixa.nascimento))

    if (caixa.ultima_saida) {
      caixa.ultima_saida = Util.formatDate(new Date(caixa.ultima_saida))
    }

    if (caixa.linhagem.id) {
      caixa.linhagem_id = caixa.linhagem.id
      delete caixa.linhagem
    }

    if (caixa.caixa_matriz.caixa_matriz_numero) {
      caixa.caixa_matriz_numero = caixa.caixa_matriz.caixa_matriz_numero
      delete caixa.caixa_matriz
    } else {
      delete caixa.caixa_matriz
    }

    axios
      .post(
        `${API_ENDPOINT}/caixa/addCaixa.json`,
        caixa,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editCaixa(caixa, onSave, onError) {
    caixa = JSON.parse(JSON.stringify(caixa))

    if (caixa.nascimento.includes('/')) {
      var newdata = caixa.nascimento.split('/')
      caixa.nascimento = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      caixa.nascimento = Util.formatDate(new Date(caixa.nascimento))
    }

    if (caixa.ultima_saida) {
      if (caixa.ultima_saida.includes('/')) {
        var newdata = caixa.ultima_saida.split('/')
        caixa.ultima_saida = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
      } else {
        caixa.ultima_saida = Util.formatDate(new Date(caixa.ultima_saida))
      }
    }

    if (caixa.linhagem.id) {
      caixa.linhagem_id = caixa.linhagem.id
      delete caixa.linhagem
    }

    if (caixa.caixa_matriz.caixa_matriz_numero) {
      caixa.caixa_matriz_numero = caixa.caixa_matriz.caixa_matriz_numero
      delete caixa.caixa_matriz
    }

    axios
      .put(
        `${API_ENDPOINT}/caixa/editCaixa.json?id=${caixa.id}`,
        caixa,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisableCaixaMatriz(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/caixaMatriz/activeAndDisable.json?id=${id}&active=${activeBool}`,
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
    data.matrizes.map((caixa) => {
      caixa.data_acasalamento = Util.formatDateTable(caixa.data_acasalamento)
      caixa.saida_da_colonia = Util.formatDateTable(caixa.saida_da_colonia)
      caixa.data_obito = Util.formatDateTable(caixa.data_obito)
    })
    console.log(data)
    return data
  }

  getCaixaMatrizHeaders() {
    const columns = [
      { field: 'caixa_matriz_numero', header: 'Número da Caixa Matriz' },
      { field: 'data_acasalamento', header: 'Data' },
      { field: 'saida_da_colonia', header: 'Saída da colônia' },
      { field: 'data_obito', header: 'Data óbito' }
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

export default new CaixaMatrizService()
