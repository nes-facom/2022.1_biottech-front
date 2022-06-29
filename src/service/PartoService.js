import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Parto {
  async #getNascDesma(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/parto/getNascDesmaTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getParto(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/parto/getPartos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getPartoInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/parto/getPartos.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getPartos(disable, page, search, year, onFetch, onHeaders) {
    console.log(disable)
    if (disable) {
      this.#getPartoInactive(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.partos),
            response.data.pagination
          ),
        onHeaders(this.getPartoHeaders())
      )
    } else {
      this.#getParto(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.partos),
            response.data.pagination
          ),
        onHeaders(this.getPartoHeaders())
      )
    }
  }

  getNascDesma(disable, page, search, year, onFetch, onHeaders) {
    this.#getNascDesma(search, page, year).then(
      (response) =>
        onFetch(
          this.#formatDate(response.data.partos),
          response.data.pagination
        ),
      onHeaders(this.getNascDesmaHeaders())
    )
  }

  saveParto(parto, onSave, onError) {
    parto = JSON.parse(JSON.stringify(parto))
    parto.data_parto = Util.formatDate(new Date(parto.data_parto))
    parto.caixa_matriz_numero = parto.caixa_matriz.caixa_matriz_numero
    delete parto.caixa_matriz
    axios
      .post(
        `${API_ENDPOINT}/parto/addParto.json`,
        parto,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editParto(parto, onSave, onError) {
    parto = JSON.parse(JSON.stringify(parto))
    console.log(parto)
    if (parto.data_parto.includes('/')) {
      var newdata = parto.data_parto.split('/')
      parto.data_parto = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      parto.data_parto = Util.formatDate(new Date(parto.data_parto))
    }

    if (parto.caixa_matriz.caixa_matriz_numero) {
      parto.caixa_matriz_numero = parto.caixa_matriz.caixa_matriz_numero
      delete parto.caixa_matriz
    }

    axios
      .put(
        `${API_ENDPOINT}/parto/editParto.json?id=${parto.id}`,
        parto,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisableParto(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/parto/activeAndDisable.json?id=${id}&active=${activeBool}`,
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
    data.map((partos) => {
      partos.data_parto = Util.formatDateTable(partos.data_parto)
      if (partos.data_desmame) {
        partos.data_desmame = Util.formatDateTable(partos.data_desmame)
      }
    })
    return data
  }

  getPartoHeaders() {
    const columns = [
      { field: 'numero_parto', header: 'Número Parto' },
      { field: 'data_parto', header: 'Data Parto' },
      { field: 'num_macho', header: 'Número Machos' },
      { field: 'num_femea', header: 'Número Fêmeas' },
      { field: 'des_macho', header: 'Desmame Macho' },
      { field: 'des_femea', header: 'Desmame Fêmea' },
      { field: 'qtd_canib', header: 'Quantidade Canibalismo' },
      { field: 'qtd_gamba', header: 'Quantidade Gambá' },
      { field: 'qtd_outros', header: 'Quantidade Outros' },
      { field: 'caixa_matriz.caixa_matriz_numero', header: 'Caixa Matriz' }
    ]
    return columns
  }

  getNascDesmaHeaders() {
    const columns = [
      { field: 'caixa_matriz.caixa_matriz_numero', header: 'CXMatriz' },
      { field: 'numero_parto', header: 'Parto N°' },
      { field: 'data_parto', header: 'Data Parto' },
      { field: 'num_macho', header: 'N° Macho' },
      { field: 'num_femea', header: 'N° Femea' },
      { field: 'data_desmame', header: 'Data Desmame' },
      { field: 'des_macho', header: 'Des Macho' },
      { field: 'des_femea', header: 'Des Fêmea' },
      { field: 'qtd_canib', header: 'Canib' },
      { field: 'qtd_gamba', header: 'Gamba' },
      { field: 'qtd_outros', header: 'Outros' },
      { field: 'total_nascimento', header: 'Total Nascimento' },
      { field: 'total_desmamado', header: 'Total Desmamado' },
      { field: 'semana_nascimento', header: 'Semana Nascimento' },
      { field: 'semana_desmame', header: 'Semana Desmame' }
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

export default new Parto()
