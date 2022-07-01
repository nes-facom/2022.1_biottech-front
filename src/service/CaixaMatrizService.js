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

  getCaixaMatrizesTable(disable, page, search, year, onFetch, onHeaders) {
    this.#getCaixaMatriz(search, page, year).then(
      (response) =>
        onFetch(
          this.#formatMatrizes(this.#formatDate(response.data.matrizes)),
          response.data.pagination
        ),
      onHeaders(this.getCaixaMatrizTableHeaders())
    )
  }

  #formatMatrizes(data) {
    data = JSON.parse(JSON.stringify(data))
    var intervaloParto = []

    for (let x = 0; x < data.length; x++) {
      data[x].tipo_acasalamento = 0
      data[x].num_femea = 0
      data[x].qtdPartos = 0
      data[x].obitos = 0
      intervaloParto = []

      for (let y = 0; y < data[x].caixa.length; y++) {
        data[x].tipo_acasalamento++
        if (data[x].caixa[y].sexo == 'macho') {
          data[x].ccxOrigemMacho = data[x].caixa[y].caixa_numero
        } else if (data[x].caixa[y].sexo == 'femea') {
          data[x].num_femea++
          data[x].ccxOrigemFemea = data[x].caixa[y].caixa_numero
        }
      }

      for (let y = 0; y < data[x].parto.length; y++) {
        intervaloParto.push(new Date(data[x].parto[y].data_parto.replace(/-/g, '\/')))
        data[x].qtdPartos++

        data[x].obitos =
          data[x].parto[y].qtd_canib +
          data[x].parto[y].qtd_gamba +
          data[x].parto[y].qtd_outros +
          data[x].obitos
      }

      intervaloParto.sort(function (a, b) {
        return a.getTime() - b.getTime()
      })

      if (intervaloParto.length >= 2) {
        data[x].intervaloParto = Math.floor(
          (intervaloParto[intervaloParto.length - 1] -
            intervaloParto[intervaloParto.length - 2]) /
            86400000
        ) + ' Dias'
      }

      if (intervaloParto.length >= 1) {
        data[x].data_parto =
          Util.formatDateTable(
            Util.formatDate(intervaloParto[intervaloParto.length - 1])
          )
      }
    }
    console.log(data)
    return data
  }

  getCaixaMatrizTableHeaders() {
    const columns = [
      { field: 'caixa_matriz_numero', header: 'Número da Caixa Matriz' },
      { field: 'data_acasalamento', header: 'Data Acasalamento' },
      { field: 'saida_da_colonia', header: 'Saída da colônia' },
      { field: 'ccxOrigemMacho', header: 'CCX Origem Macho' },
      { field: 'ccxOrigemFemea', header: 'CCX Origem Fêmea' },
      { field: 'tipo_acasalamento', header: 'Tipo Acasalamento' },
      { field: 'num_femea', header: 'Nº Fêmea' },
      { field: 'data_parto', header: 'Data Parto' },
      { field: 'obitos', header: 'Óbitos' },
      { field: 'qtdPartos', header: 'Qtd de Partos' },
      { field: 'intervaloParto', header: 'Intervalo Parto' }
    ]
    return columns
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
    if (caixa_matriz.data_obito) {
      caixa_matriz.data_obito = Util.formatDate(
        new Date(caixa_matriz.data_obito)
      )
    }

    if (caixa_matriz.saida_da_colonia) {
      caixa_matriz.saida_da_colonia = Util.formatDate(
        new Date(caixa_matriz.saida_da_colonia)
      )
    }

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

    if (caixa_matriz.data_acasalamento.includes('/')) {
      var newdata = caixa_matriz.data_acasalamento.split('/')
      caixa_matriz.data_acasalamento =
        newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      caixa_matriz.data_acasalamento = Util.formatDate(
        new Date(caixa_matriz.data_acasalamento)
      )
    }

    if (caixa_matriz.data_obito) {
      if (caixa_matriz.data_obito.includes('/')) {
        var newdata = caixa_matriz.data_obito.split('/')
        caixa_matriz.data_obito =
          newdata[2] + '-' + newdata[1] + '-' + newdata[0]
      } else {
        caixa_matriz.data_obito = Util.formatDate(
          new Date(caixa_matriz.data_obito)
        )
      }
    }

    if (caixa_matriz.saida_da_colonia) {
      if (caixa_matriz.saida_da_colonia.includes('/')) {
        var newdata = caixa_matriz.saida_da_colonia.split('/')
        caixa_matriz.saida_da_colonia =
          newdata[2] + '-' + newdata[1] + '-' + newdata[0]
      } else {
        caixa_matriz.saida_da_colonia = Util.formatDate(
          new Date(caixa_matriz.saida_da_colonia)
        )
      }
    }

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
