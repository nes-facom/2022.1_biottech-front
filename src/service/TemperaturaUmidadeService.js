import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class TemperaturaUmidade {
  async #getTemperaturaUmidade(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/temperaturaUmidade/getTemperaturaUmidadeTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getTemperaturaUmidadeInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/temperaturaUmidade/getTemperaturaUmidadeTable.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getTemperaturaUmidade(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getTemperaturaUmidadeInactive(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.temperatura),
            response.data.pagination
          ),
        onHeaders(this.getTemperaturaUmidadeHeaders())
      )
    } else {
      this.#getTemperaturaUmidade(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.temperatura),
            response.data.pagination
          ),
        onHeaders(this.getTemperaturaUmidadeHeaders())
      )
    }
  }

  saveTemperaturaUmidade(tempumi, onSave, onError) {
    tempumi = JSON.parse(JSON.stringify(tempumi))
    tempumi.data = Util.formatDate(new Date(tempumi.data))
    tempumi.num_sala = tempumi.sala.num_sala
    delete tempumi.sala
    axios
      .post(
        `${API_ENDPOINT}/temperaturaUmidade/addTemperaturaUmidade.json`,
        tempumi,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editTemperaturaUmidade(tempumi, onSave, onError) {
    tempumi = JSON.parse(JSON.stringify(tempumi))

    if (tempumi.data.includes('/')) {
      var newdata = tempumi.data.split('/')
      tempumi.data = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      tempumi.data = Util.formatDate(new Date(tempumi.data))
    }

    if (tempumi.sala.num_sala) {
      tempumi.num_sala = tempumi.sala.num_sala
      delete tempumi.sala
    }

    axios
      .put(
        `${API_ENDPOINT}/temperaturaUmidade/editTemperaturaUmidade.json?id=${tempumi.id}`,
        tempumi,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisableTemperaturaUmidade(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/temperaturaUmidade/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  getSala(search, onFetch, onError) {
    axios
      .get(
        `${API_ENDPOINT}/sala/getSala.json?search=${search}&active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
      .catch((e) => onError(e))
  }

  #formatDate(data) {
    data.map((temperatura) => {
      temperatura.data = Util.formatDateTable(temperatura.data)
    })
    return data
  }

  getTemperaturaUmidadeHeaders() {
    const columns = [
      { field: 'data', header: 'Data' },
      { field: 'temp_matutino', header: 'Temperatura Matutino' },
      { field: 'ur_matutino', header: 'UR Matutino' },
      { field: 'temp_vespertino', header: 'Temperatura Vespertino' },
      { field: 'ur_vespertino', header: 'UR Vespertino' },
      { field: 'observacoes', header: 'Observações' },
      { field: 'sala.num_sala', header: 'Número da Sala' }
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

export default new TemperaturaUmidade()
