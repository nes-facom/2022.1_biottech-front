import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'

class UserService {
  async #getUser(search, page) {
    return axios.get(
      `${API_ENDPOINT}/users/getAllUsers.json?page=${page}&limit=5&active=true&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getUserInactive(search, page) {
    return axios.get(
      `${API_ENDPOINT}/users/getAllUsers.json?page=${page}&limit=5&active=false&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async generatePassword(id, onFetch) {
    return axios
      .get(
        `${API_ENDPOINT}/users/newPassword.json?id=${id}`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getUsers(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getUserInactive(search, page).then(
        (response) => onFetch(response.data.user, response.data.pagination),
        onHeaders(this.getUserHeaders())
      )
    } else {
      this.#getUser(search, page).then(
        (response) => onFetch(response.data.user, response.data.pagination),
        onHeaders(this.getUserHeaders())
      )
    }
  }

  activeAndDisableUser(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/users/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  saveUser(user, onSave, onError) {
    user = JSON.parse(JSON.stringify(user))
    axios
      .post(`${API_ENDPOINT}/users/addUser.json`, user, this.buildAuthHeader())
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  changePasswordUser(password, onSave, onError) {
    password = JSON.parse(JSON.stringify(password))
    axios
      .put(
        `${API_ENDPOINT}/users/editPassword.json`,
        password,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editUser(user, onSave, onError) {
    user = JSON.parse(JSON.stringify(user))
    axios
      .put(
        `${API_ENDPOINT}/users/editUser.json?id=${user.id}`,
        user,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  getUserHeaders() {
    const columns = [
      { field: 'name', header: 'Nome' },
      { field: 'username', header: 'E-mail' },
      { field: 'type', header: 'Tipo' }
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

export default new UserService()
