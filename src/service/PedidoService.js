import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class Pedido {
  async #getPedido(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/pedido/getPedidos.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  async #getPedidoInactive(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/pedido/getPedidos.json?page=${page}&limit=8&active=false&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

  savePedido(pedido, onSave, onError) {
    pedido = JSON.parse(JSON.stringify(pedido))
    pedido.vinculo_institucional_id = pedido.vinculo_institucional.id
    pedido.projeto_id = pedido.projeto.id
    pedido.especie_id = pedido.especie.id
    pedido.linha_pesquisa_id = pedido.linha_pesquisa.id
    pedido.nivel_projeto_id = pedido.nivel_projeto.id
    pedido.laboratorio_id = pedido.laboratorio.id
    pedido.finalidade_id = pedido.finalidade.id
    pedido.pesquisador_id = pedido.pesquisador.id
    pedido.linhagem_id = pedido.linhagem.id
    delete pedido.vinculo_institucional;
    delete pedido.projeto;
    delete pedido.especie;
    delete pedido.linha_pesquisa;
    delete pedido.nivel_projeto;
    delete pedido.laboratorio;
    delete pedido.finalidade;
    delete pedido.pesquisador;
    delete pedido.linhagem;

    pedido.data_solicitacao = Util.formatDate(new Date(pedido.data_solicitacao))
    pedido.vigencia_ceua = Util.formatDate(new Date(pedido.vigencia_ceua))
    axios
      .post(
        `${API_ENDPOINT}/pedido/addPedido.json`,
        pedido,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editPedido(pedido, onSave, onError) {
    pedido = JSON.parse(JSON.stringify(pedido))
    pedido.vinculo_institucional_id = pedido.vinculo_institucional.id
    pedido.projeto_id = pedido.projeto.id
    pedido.especie_id = pedido.especie.id
    pedido.linha_pesquisa_id = pedido.linha_pesquisa.id
    pedido.nivel_projeto_id = pedido.nivel_projeto.id
    pedido.laboratorio_id = pedido.laboratorio.id
    pedido.finalidade_id = pedido.finalidade.id
    pedido.pesquisador_id = pedido.pesquisador.id
    pedido.linhagem_id = pedido.linhagem.id
    delete pedido.vinculo_institucional;
    delete pedido.projeto;
    delete pedido.especie;
    delete pedido.linha_pesquisa;
    delete pedido.nivel_projeto;
    delete pedido.laboratorio;
    delete pedido.finalidade;
    delete pedido.pesquisador;
    delete pedido.linhagem;

    pedido.data_solicitacao = Util.formatDate(new Date(pedido.data_solicitacao))
    pedido.vigencia_ceua = Util.formatDate(new Date(pedido.vigencia_ceua))
    axios
      .put(
        `${API_ENDPOINT}/pedido/editPedido.json?id=${pedido.id}`,
        pedido,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  activeAndDisablePedido(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisable.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  getPedidos(disable, page, search, year, onFetch) {
    if (disable) {
      this.#getPedidoInactive(search, page, year).then((response) =>
        onFetch(this.#formatDate(response.data))
      )
    } else {
      this.#getPedido(search, page, year).then((response) =>
        onFetch(response.data)
      )
    }
  }

  getVinculoInstitucional(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getVinculoInstitucionais.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getProjetos(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getProjetos.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getEspecies(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getEspecies.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getLinhaPesquisas(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getLinhaPesquisas.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getNivelProjetos(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getNivelProjetos.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getLaboratorios(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getLaboratorios.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getFinalidades(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pedido/getFinalidades.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getLinhagens(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/linhagem/getLinhagens.json?active=true&search=`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  getPesquisador(onFetch) {
    axios
      .get(
        `${API_ENDPOINT}/pesquisador/getPesquisador.json?active=true`,
        this.buildAuthHeader()
      )
      .then((response) => onFetch(response.data))
  }

  #formatDate(data) {
    data.pedidos.map((pedido) => {
      ;(pedido.data_solicitacao = Util.formatDateTable(
        pedido.data_solicitacao
      )),
        (pedido.vigencia_ceua = Util.formatDateTable(pedido.vigencia_ceua))
    })
    return data
  }

  getPedidoHeaders() {
    const columns = [
      { field: 'pesquisador.nome', header: 'Pesquisador' },
      { field: 'data_solicitacao', header: 'Solicitação' },
      { field: 'vigencia_ceua', header: 'Vigência' },
      { field: 'num_aprovado', header: 'N°Aprovados' },
      { field: 'num_solicitado', header: 'N°Solicitado' },
      { field: 'linhagem.nome_linhagem', header: 'Linhagem' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'idade', header: 'Idade' },
      { field: 'peso', header: 'Peso' }
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

export default new Pedido()
