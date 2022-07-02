import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class SalaService {
  getSalaHeaders() {
    const columns = [{ field: 'num_sala', header: 'Número Sala' }]
    return columns
  }

  async #getSalas() {
    return axios.get(
      `${API_ENDPOINT}/sala/getSalas.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getSalasInactive() {
    return axios.get(
      `${API_ENDPOINT}/sala/getSalas.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getSalasConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getSalasInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getSalaHeaders())
      )
    } else {
      this.#getSalas().then(
        (response) => onFetch(response.data),
        onHeaders(this.getSalaHeaders())
      )
    }
  }

  getSalas(onFetch, onError) {
    axios
      .get(
        `${API_ENDPOINT}/sala/getSalas.json?search=&active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
      .catch((e) => onError(e))
  }

  activeAndDisableSala(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/sala/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  saveSala(sala, onSave, onError) {
    axios
      .post(`${API_ENDPOINT}/sala/addSala.json`, sala, this.buildAuthHeader())
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editSala(sala, onSave, onError) {
    axios
      .put(
        `${API_ENDPOINT}/sala/editSala.json?id=${sala.id}`,
        sala.name,
        this.buildAuthHeader()
      )
      .then(() => onSave())
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

export default new SalaService()
