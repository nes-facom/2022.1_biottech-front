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

  saveCaixaMatriz(caixa_matriz, caixas, onSave, onError) {
    caixa_matriz = JSON.parse(JSON.stringify(caixa_matriz))
    caixa_matriz.data_acasalamento = Util.formatDate(
      new Date(caixa_matriz.data_acasalamento)
    )
    caixa_matriz.data_obito = Util.formatDate(new Date(caixa_matriz.data_obito))
    caixa_matriz.saida_da_colonia = Util.formatDate(
      new Date(caixa_matriz.saida_da_colonia)
    )
    caixas = JSON.parse(JSON.stringify(caixas))
    caixa_matriz.caixas = caixas

    axios
      .post(
        `${API_ENDPOINT}/caixaMatriz/addCaixaMatriz.json`,
        caixa_matriz,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editCaixaMatriz(caixa_matriz, caixas, onSave, onError) {
    caixa_matriz = JSON.parse(JSON.stringify(caixa_matriz))
    caixa_matriz.data_acasalamento = Util.formatDate(
      new Date(caixa_matriz.data_acasalamento)
    )
    caixa_matriz.data_obito = Util.formatDate(new Date(caixa_matriz.data_obito))
    caixa_matriz.saida_da_colonia = Util.formatDate(
      new Date(caixa_matriz.saida_da_colonia)
    )
    caixas = JSON.parse(JSON.stringify(caixas))
    caixa_matriz.caixas = caixas

    axios
      .put(
        `${API_ENDPOINT}/caixaMatriz/editCaixaMatriz.json?id=${caixa_matriz.id}`,
        caixa_matriz,
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
    console.log(data)
    data.matrizes.map((caixa) => {
      caixa.data_acasalamento = Util.formatDateTable(caixa.data_acasalamento)
      if (caixa.saida_da_colonia) {
        caixa.saida_da_colonia = Util.formatDateTable(caixa.saida_da_colonia)
      }
      if (caixa.saida_da_colonia) {
        caixa.data_obito = Util.formatDateTable(caixa.data_obito)
      }
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
