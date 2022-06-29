import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Previsao {
  async #getPrevisaoTable(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/previsao/getPrevisaoTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

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

  getPrevisoes(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getPrevisaoInactive(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.previsao),
            response.data.pagination
          ),
        onHeaders(this.getPrevisaoHeaders())
      )
    } else {
      this.#getPrevisao(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.previsao),
            response.data.pagination
          ),
        onHeaders(this.getPrevisaoHeaders())
      )
    }
  }

  getPrevisaoTable(disable, page, search, year, onFetch, onHeaders) {
    this.#getPrevisaoTable(search, page, year).then(
      (response) =>
        onFetch(
          this.#formatDate(response.data.previsao),
          response.data.pagination
        ),
      onHeaders(this.getPrevisaoHeadersTable())
    )
  }

  #formatDate(data) {
    data.map((previsao) => {
      previsao.retirada_data = Util.formatDateTable(previsao.retirada_data)
    })
    return data
  }

  savePrevisao(previsao, onSave, onError) {
    previsao = JSON.parse(JSON.stringify(previsao))
    previsao.retirada_data = Util.formatDate(new Date(previsao.retirada_data))

    axios
      .post(
        `${API_ENDPOINT}/previsao/addPrevisao.json`,
        previsao,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editPrevisao(previsao, onSave, onError) {
    previsao = JSON.parse(JSON.stringify(previsao))

    if (previsao.retirada_data.includes('/')) {
      var newdata = previsao.retirada_data.split('/')
      previsao.retirada_data = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      previsao.retirada_data = Util.formatDate(new Date(previsao.retirada_data))
    }

    axios
      .put(
        `${API_ENDPOINT}/previsao/editPrevisao.json?id=${previsao.id}`,
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

  getPrevisaoHeadersTable() {
    const columns = [
      { field: 'num_previsao', header: 'Previsão Nº' },
      { field: 'retirada_num', header: 'Retirada Nº' },
      { field: 'retirada', header: 'Retirada' },
      { field: 'qtd_retirar', header: 'Qtd Retirar' },
      { field: 'retirada_data', header: 'Retirada Data' },
      { field: 'totalRetirado', header: ' Total Retirado' },
      { field: 'retirada_semana', header: 'Retirada Semana' },
      { field: 'ano', header: 'Ano' },
      { field: 'semestre', header: 'Semestre' },
      { field: 'mes', header: 'Mês' },
      { field: 'status', header: 'Status' },
      { field: 'pedido.pesquisador.nome', header: 'Pesquisador' },
      { field: 'pedido.pesquisador.instituicao', header: 'Instituição' },
      { field: 'pedido.pesquisador.setor', header: 'Setor' },
      { field: 'pedido.pesquisador.pos', header: 'Pos' },
      { field: 'pedido.sexo', header: 'Sexo' },
      { field: 'pedido.idade', header: 'Idade' },
      { field: 'pedido.peso', header: 'Peso' },
      { field: 'pedido.linhagem.nome_linhagem', header: 'Linhagem' },
      { field: 'pedido.projeto.nome_projeto', header: 'Projeto' },
      { field: 'pedido.finalidade.nome_finalidade', header: 'Finalidade' },
      { field: 'pedido.exper', header: 'Exper' }
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
