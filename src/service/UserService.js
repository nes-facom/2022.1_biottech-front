import AuthService from "./AuthService";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

class ApiService {

  //Clients
  listClients() {
    return axios.get(`${API_ENDPOINT}/users/getAllUsers.json?active=true`, this.buildAuthHeader())
  }

  /*saveClient(client, onSave, onError) {
    axios.post(`${API_ENDPOINT}/clients`, client, this.buildAuthHeader())
      .then(() => onSave())
      .catch(e => onError(e));
  }

  loadClient(id, onLoad, onError) {
    axios.get(`${API_ENDPOINT}/clients/${id}`, this.buildAuthHeader())
      .then(response => onLoad(response.data))
      .catch(e => onError(e));
  }

  putClient(id, client, onSave, onError) {
    axios.put(`${API_ENDPOINT}/clients/${id}`, client, this.buildAuthHeader())
      .then(() => onSave())
      .catch(e => onError(e));

  }*/


  buildAuthHeader() {
    return {
      headers: {
        'Authorization': `Bearer ${AuthService.getJWTToken()}`
      }
    }
  }

}

export default new ApiService();