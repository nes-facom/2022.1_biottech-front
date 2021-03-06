import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class LinhagemService {
  getLinhagemHeaders() {
    const columns = [{ field: 'nome_linhagem', header: 'Nome Linhagem' }]
    return columns
  }

  async #getLinhagem() {
    return axios.get(
      `${API_ENDPOINT}/linhagem/getLinhagens.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getLinhagemInactive() {
    return axios.get(
      `${API_ENDPOINT}/linhagem/getLinhagens.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getLinhagemConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getLinhagemInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getLinhagemHeaders())
      )
    } else {
      this.#getLinhagem().then(
        (response) => onFetch(response.data),
        onHeaders(this.getLinhagemHeaders())
      )
    }
  }

  getLinhagem(onFetch, onError) {
    axios
      .get(
        `${API_ENDPOINT}/linhagem/getLinhagens.json?search=&active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
      .catch((e) => onError(e))
  }

  activeAndDisableLinhagem(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/linhagem/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  saveLinhagem(nome_linhagem, onSave, onError) {
    var linhagem = {}
    linhagem.nome_linhagem = nome_linhagem
    axios
      .post(
        `${API_ENDPOINT}/linhagem/addLinhagem.json`,
        linhagem,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editLinhagem(linhagem, onSave, onError) {
    linhagem = JSON.parse(JSON.stringify(linhagem))
    var linhagens = {}
    linhagens.nome_linhagem = linhagem.name
    axios
      .put(
        `${API_ENDPOINT}/linhagem/editLinhagem.json?id=${linhagem.id}`,
        linhagens,
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

export default new LinhagemService()
