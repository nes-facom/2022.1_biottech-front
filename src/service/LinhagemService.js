import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class LinhagemService {
  getLinhagemHeaders() {
    const columns = [{ field: 'nome_linhagem', header: 'Nome Linhagem' }]
    return columns
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


  buildAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }
}

export default new LinhagemService()