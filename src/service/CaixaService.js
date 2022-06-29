import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Caixa {

  async #getEntradaDados(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixa/getEntradaDadosTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

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

  getCaixas(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getCaixaInactive(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.caixas),
            response.data.pagination
          ),
        onHeaders(this.getCaixaHeaders())
      )
    } else {
      this.#getCaixa(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.caixas),
            response.data.pagination
          ),
        onHeaders(this.getCaixaHeaders())
      )
    }
  }

  getEntradaDados(disable, page, search, year, onFetch, onHeaders) {
    this.#getEntradaDados(search, page, year).then(
      (response) =>
        onFetch(
          this.#formatDate(response.data.entradaDados),
          response.data.pagination
        ),
      onHeaders(this.getEntradaDadosHeadersTable())
    )
  }

  #formatDate(data) {
    data.map((caixa) => {
      caixa.nascimento = Util.formatDateTable(caixa.nascimento)

      if (caixa.ultima_saida) {
        caixa.ultima_saida = Util.formatDateTable(caixa.ultima_saida)
      }
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

  getEntradaDadosHeadersTable() {
    const columns = [
      { field: 'caixa_numero', header: 'CXN' },
      { field: 'linhagem.nome_linhagem', header: 'Grupo' },
      { field: 'caixa_matriz.caixa_matriz_numero', header: 'CXOrigem' },
      { field: 'nascimento', header: 'Nascimento' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'num_animais', header: 'Nº' },
      { field: 'qtd_saida', header: 'Saída' },
      { field: 'sobra', header: 'Sobra' },
      { field: 'idade_atual', header: 'Idade Atual' },
      { field: 'ultima_saida', header: 'Última Saída Data' },
      { field: 'ultima_saida_semana', header: 'Última Saída Semana' },
      { field: 'dias_na_colonia', header: 'Dias Na Colônia' },
      { field: 'semanas_na_colonia', header: 'Semanas Na Colônia' }
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
