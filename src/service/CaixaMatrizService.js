import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class CaixaMatrizService {
  async #getProgramacaoAcasalamento(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixaMatriz/getProgamacaoAcasalamentoTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getCaixaMatriz(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixaMatriz/getMatrizesTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getCaixaMatrizInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/caixaMatriz/getMatrizesTable.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  getCaixaMatrizes(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getCaixaMatrizInactive(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.matrizes),
            response.data.pagination
          ),
        onHeaders(this.getCaixaMatrizHeaders())
      )
    } else {
      this.#getCaixaMatriz(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.matrizes),
            response.data.pagination
          ),
        onHeaders(this.getCaixaMatrizHeaders())
      )
    }
  }

  getProgramacaoAcasalamento(disable, page, search, year, onFetch, onHeaders) {
    this.#getProgramacaoAcasalamento(search, page, year).then(
      (response) =>
        onFetch(
          this.#formatProgramacaoAcasalamento(
            this.#formatDate(response.data.progamacaoAcasalamento)
          ),
          response.data.pagination
        ),
      onHeaders(this.getProgramacaoAcasalamentoHeaders())
    )
  }

  saveCaixaMatriz(caixa_matriz, caixas, onSave, onError) {
    caixa_matriz = JSON.parse(JSON.stringify(caixa_matriz))
    caixa_matriz.data_acasalamento = Util.formatDate(
      new Date(caixa_matriz.data_acasalamento)
    )
    caixa_matriz.data_obito = Util.formatDate(new Date(caixa_matriz.data_obito))
    caixa_matriz.saida_da_colonia = Util.formatDate(
      new Date(caixa_matriz.saida_da_colonia)
    )
    caixas = JSON.parse(JSON.stringify(caixas))
    caixa_matriz.caixas = caixas

    axios
      .post(
        `${API_ENDPOINT}/caixaMatriz/addCaixaMatriz.json`,
        caixa_matriz,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editCaixaMatriz(caixa_matriz, caixas, onSave, onError) {
    caixa_matriz = JSON.parse(JSON.stringify(caixa_matriz))
    caixa_matriz.data_acasalamento = Util.formatDate(
      new Date(caixa_matriz.data_acasalamento)
    )
    caixa_matriz.data_obito = Util.formatDate(new Date(caixa_matriz.data_obito))
    caixa_matriz.saida_da_colonia = Util.formatDate(
      new Date(caixa_matriz.saida_da_colonia)
    )
    caixas = JSON.parse(JSON.stringify(caixas))
    caixa_matriz.caixas = caixas

    axios
      .put(
        `${API_ENDPOINT}/caixaMatriz/editCaixaMatriz.json?id=${caixa_matriz.id}`,
        caixa_matriz,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisableCaixaMatriz(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/caixaMatriz/activeAndDisable.json?id=${id}&active=${activeBool}`,
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
    data.map((caixa) => {
      caixa.data_acasalamento = Util.formatDateTable(caixa.data_acasalamento)
      if (caixa.saida_da_colonia) {
        caixa.saida_da_colonia = Util.formatDateTable(caixa.saida_da_colonia)
      }
      if (caixa.data_obito) {
        caixa.data_obito = Util.formatDateTable(caixa.data_obito)
      }
    })
    return data
  }

  #formatProgramacaoAcasalamento(data) {
    data = JSON.parse(JSON.stringify(data))
    for (var i = 0; i < data.length; i++) {
      for (var y = 0; y < data[i].caixa.length; y++) {
        console.log(data[i].caixa[y])
        if (data[i].caixa[y].sexo == 'macho') {
          console.log('teste')
          data[i].caixa_macho = data[i].caixa[y].caixa_numero
          data[i].peso_macho = data[i].caixa[y]._joinData.peso
          if (data[i].caixa[y].nascimento) {
            data[i].dataNascMacho = Util.formatDateTable(
              data[i].caixa[y].nascimento
            )
          }
        } else if (data[i].caixa[y].sexo == 'femea') {
          data[i].caixa_femea = data[i].caixa[y].caixa_numero
          data[i].peso_femea = data[i].caixa[y]._joinData.peso
          if (data[i].caixa[y].nascimento) {
            data[i].dataNascFemea = Util.formatDateTable(
              data[i].caixa[y].nascimento
            )
          }
        }
      }
    }
    /*data.forEach((element) => {
      element.caixa.forEach((elementCaixa) => {
        if (elementCaixa.sexo == 'macho') {
          tableTest.caixa_macho = elementCaixa.caixa_numero
          tableTest.peso_macho = elementCaixa._joinData.peso
          if (elementCaixa.nascimento) {
            tableTest.dataNascMacho = Util.formatDateTable(
              elementCaixa.nascimento
            )
          }
        } else if (elementCaixa.sexo == 'femea') {
          tableTest.caixa_femea = elementCaixa.caixa_numero
          tableTest.peso_femea = elementCaixa._joinData.peso
          if (elementCaixa.nascimento) {
            tableTest.dataNascFemea = Util.formatDateTable(
              elementCaixa.nascimento
            )
          }
        }
      })

      console.log(tableTest)
    })*/

    
    console.log(data)
    return data
  }

  getCaixaMatrizHeaders() {
    const columns = [
      { field: 'caixa_matriz_numero', header: 'Número da Caixa Matriz' },
      { field: 'data_acasalamento', header: 'Data' },
      { field: 'saida_da_colonia', header: 'Saída da colônia' },
      { field: 'data_obito', header: 'Data óbito' }
    ]
    return columns
  }

  getProgramacaoAcasalamentoHeaders() {
    const columns = [
      { field: 'caixa_matriz_numero', header: 'Número da Caixa Matriz' },
      { field: 'data_acasalamento', header: 'Data' },
      { field: 'saida_da_colonia', header: 'Saída da colônia' },
      { field: 'data_obito', header: 'Data óbito' },
      { field: 'caixa_macho', header: 'Caixa Macho' },
      { field: 'peso_macho', header: 'Peso Macho' },
      { field: 'dataNascMacho', header: 'Data Nascimento Macho' },
      { field: 'caixa_femea', header: 'Caixa Fêmea' },
      { field: 'peso_femea', header: 'Peso Fêmea' },
      { field: 'dataNascFemea', header: 'Data Nascimento Fêmea' }
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

export default new CaixaMatrizService()
