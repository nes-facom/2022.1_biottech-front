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
      `${API_ENDPOINT}/caixa/getCaixas.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
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

  activeAndDisableCaixa(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/caixa/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
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
      { field: 'ultima_saida', header: 'Última Saída' },
      { field: 'caixa_matriz.caixa_matriz_numero', header: 'Caixa Matriz' }
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
