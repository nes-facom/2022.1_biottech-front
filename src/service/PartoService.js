import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Parto {
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

  getPartos(disable, page, search, year, onFetch) {
    console.log(disable)
    if (disable) {
      this.#getPartoInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getParto(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    }
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
    data.partos.map((partos) => {
      partos.data_parto = Util.formatDateTable(partos.data_parto)
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

  buildAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }
}

export default new Parto()
