import AuthService from './AuthService'
import axios from 'axios'
import { API_ENDPOINT } from '../constants'
import Util from '../util/Util'

class PedidoService {
  getLinhaPesquisaHeaders() {
    const columns = [
      { field: 'nome_linha_pesquisa', header: 'Nome Linha Pesquisa' }
    ]
    return columns
  }

  getVinculoInstitucionalHeaders() {
    const columns = [
      {
        field: 'nome_vinculo_institucional',
        header: 'Nome Vínculo Institucional'
      }
    ]
    return columns
  }

  getProjetosHeaders() {
    const columns = [{ field: 'nome_projeto', header: 'Nome Projeto' }]
    return columns
  }

  getLaboratoriosHeaders() {
    const columns = [{ field: 'nome_laboratorio', header: 'Nome Laboratório' }]
    return columns
  }

  getNivelProjetoHeaders() {
    const columns = [
      { field: 'nome_nivel_projeto', header: 'Nome Nível Pesquisa' }
    ]
    return columns
  }

  getEspeciesHeaders() {
    const columns = [{ field: 'nome_especie', header: 'Nome Espécie' }]
    return columns
  }

  getFinalidadesHeaders() {
    const columns = [{ field: 'nome_finalidade', header: 'Nome Finalidade' }]
    return columns
  }

  async #getPedidoTable(search, page, year) {
    return axios.get(
      `${API_ENDPOINT}/pedido/getPedidosTable.json?page=${page}&limit=8&active=true&year=${year}&search=${search}`,
      this.buildAuthHeader()
    )
  }

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

    if (pedido.vinculo_institucional) {
      pedido.vinculo_institucional_id = pedido.vinculo_institucional.id
      delete pedido.vinculo_institucional
    }
    if (pedido.linha_pesquisa) {
      pedido.linha_pesquisa_id = pedido.linha_pesquisa.id
      delete pedido.linha_pesquisa
    }
    if (pedido.nivel_projeto) {
      pedido.nivel_projeto_id = pedido.nivel_projeto.id
      delete pedido.nivel_projeto
    }
    if (pedido.laboratorio) {
      pedido.laboratorio_id = pedido.laboratorio.id
      delete pedido.laboratorio
    }

    pedido.projeto_id = pedido.projeto.id
    pedido.especie_id = pedido.especie.id
    pedido.finalidade_id = pedido.finalidade.id
    pedido.pesquisador_id = pedido.pesquisador.id
    pedido.linhagem_id = pedido.linhagem.id

    delete pedido.projeto
    delete pedido.especie
    delete pedido.finalidade
    delete pedido.pesquisador
    delete pedido.linhagem

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
    if (pedido.vinculo_institucional) {
      pedido.vinculo_institucional_id = pedido.vinculo_institucional.id
      delete pedido.vinculo_institucional
    }
    if (pedido.linha_pesquisa) {
      pedido.linha_pesquisa_id = pedido.linha_pesquisa.id
      delete pedido.linha_pesquisa
    }
    if (pedido.nivel_projeto) {
      pedido.nivel_projeto_id = pedido.nivel_projeto.id
      delete pedido.nivel_projeto
    }
    if (pedido.laboratorio) {
      pedido.laboratorio_id = pedido.laboratorio.id
      delete pedido.laboratorio
    }

    pedido.projeto_id = pedido.projeto.id
    pedido.especie_id = pedido.especie.id
    pedido.finalidade_id = pedido.finalidade.id
    pedido.pesquisador_id = pedido.pesquisador.id
    pedido.linhagem_id = pedido.linhagem.id

    delete pedido.projeto
    delete pedido.especie
    delete pedido.finalidade
    delete pedido.pesquisador
    delete pedido.linhagem

    if (pedido.data_solicitacao.includes('/')) {
      var newdata = pedido.data_solicitacao.split('/')
      pedido.data_solicitacao = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      pedido.data_solicitacao = Util.formatDate(
        new Date(pedido.data_solicitacao)
      )
    }

    if (pedido.vigencia_ceua.includes('/')) {
      var newdata = pedido.vigencia_ceua.split('/')
      pedido.vigencia_ceua = newdata[2] + '-' + newdata[1] + '-' + newdata[0]
    } else {
      pedido.vigencia_ceua = Util.formatDate(new Date(pedido.vigencia_ceua))
    }

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

  getPedidos(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getPedidoInactive(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.pedidos),
            response.data.pagination
          ),
        onHeaders(this.getPedidoHeaders())
      )
    } else {
      this.#getPedido(search, page, year).then(
        (response) =>
          onFetch(
            this.#formatDate(response.data.pedidos),
            response.data.pagination
          ),
        onHeaders(this.getPedidoHeaders())
      )
    }
  }

  getPedidosTable(disable, page, search, year, onFetch, onHeaders) {
    this.#getPedidoTable(search, page, year).then(
      (response) =>
        onFetch(
          this.#formatDate(response.data.pedidos),
          response.data.pagination
        ),
      onHeaders(this.getPedidoHeadersTable())
    )
  }
  async #getVinculoInstitucional() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getVinculoInstitucionais.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getVinculoInstitucionalInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getVinculoInstitucionais.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getVinculoInstitucionalConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getVinculoInstitucionalInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getVinculoInstitucionalHeaders())
      )
    } else {
      this.#getVinculoInstitucional().then(
        (response) => onFetch(response.data),
        onHeaders(this.getVinculoInstitucionalHeaders())
      )
    }
  }

  async #getProjetos() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getProjetos.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getProjetosInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getProjetos.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getProjetosConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getProjetosInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getProjetosHeaders())
      )
    } else {
      this.#getProjetos().then(
        (response) => onFetch(response.data),
        onHeaders(this.getProjetosHeaders())
      )
    }
  }

  async #getEspecies() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getEspecies.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getEspeciesInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getEspecies.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getEspeciesConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getEspeciesInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getEspeciesHeaders())
      )
    } else {
      this.#getEspecies().then(
        (response) => onFetch(response.data),
        onHeaders(this.getEspeciesHeaders())
      )
    }
  }

  async #getLinhaPesquisas() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getLinhaPesquisas.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getLinhaPesquisasInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getLinhaPesquisas.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getLinhaPesquisasConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getLinhaPesquisasInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getLinhaPesquisaHeaders())
      )
    } else {
      this.#getLinhaPesquisas().then(
        (response) => onFetch(response.data),
        onHeaders(this.getLinhaPesquisaHeaders())
      )
    }
  }

  async #getNivelProjetos() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getNivelProjetos.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getNivelProjetosInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getNivelProjetos.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getNivelProjetosConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getNivelProjetosInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getNivelProjetoHeaders())
      )
    } else {
      this.#getNivelProjetos().then(
        (response) => onFetch(response.data),
        onHeaders(this.getNivelProjetoHeaders())
      )
    }
  }

  async #getLaboratorios() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getLaboratorios.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getLaboratoriosInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getLaboratorios.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getLaboratoriosConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getLaboratoriosInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getLaboratoriosHeaders())
      )
    } else {
      this.#getLaboratorios().then(
        (response) => onFetch(response.data),
        onHeaders(this.getLaboratoriosHeaders())
      )
    }
  }

  async #getFinalidades() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getFinalidades.json?active=true&search=`,
      this.buildAuthHeader()
    )
  }

  async #getFinalidadesInactive() {
    return axios.get(
      `${API_ENDPOINT}/pedido/getFinalidades.json?active=false&search=`,
      this.buildAuthHeader()
    )
  }

  getFinalidadesConfig(disable, page, search, year, onFetch, onHeaders) {
    if (disable) {
      this.#getFinalidadesInactive().then(
        (response) => onFetch(response.data),
        onHeaders(this.getFinalidadesHeaders())
      )
    } else {
      this.#getFinalidades().then(
        (response) => onFetch(response.data),
        onHeaders(this.getFinalidadesHeaders())
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

  activeAndDisableLinhaPesquisa(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableLinhaPesquisa.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  activeAndDisableVinculoInstitucional(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableVinculoInstitucional.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  activeAndDisableProjeto(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableProjeto.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  activeAndDisableLaboratorio(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableLaboratorio.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  activeAndDisableNivelProjeto(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableNivelProjeto.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  activeAndDisableEspecie(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableEspecie.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  activeAndDisableFinalidade(id, onDelete, activeBool) {
    axios
      .delete(
        `${API_ENDPOINT}/pedido/activeAndDisableFinalidade.json?id=${id}&active=${activeBool}`,
        this.buildAuthHeader()
      )
      .then((response) => {
        onDelete(true)
      })
      .catch((error) => {
        onDelete(false)
      })
  }

  saveLinhaPesquisa(nome_linha_pesquisa, onSave, onError) {
    var linha_pesquisa = {}
    linha_pesquisa.nome_linha_pesquisa = nome_linha_pesquisa
    axios
      .post(
        `${API_ENDPOINT}/pedido/addLinhaPesquisa.json`,
        linha_pesquisa,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editLinhaPesquisa(linha_pesquisa, onSave, onError) {
    linha_pesquisa = JSON.parse(JSON.stringify(linha_pesquisa))
    var linha_pesquisas = {}
    linha_pesquisas.nome_linha_pesquisa = linha_pesquisa.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editLinhaPesquisa.json?id=${linha_pesquisa.id}`,
        linha_pesquisas,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  saveVinculoInstitucional(nome_vinculo_institucional, onSave, onError) {
    var vinculo_institucional = {}
    vinculo_institucional.nome_vinculo_institucional =
      nome_vinculo_institucional
    axios
      .post(
        `${API_ENDPOINT}/pedido/addVinculoInstitucional.json`,
        vinculo_institucional,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editVinculoInstitucional(vinculo_institucional, onSave, onError) {
    vinculo_institucional = JSON.parse(JSON.stringify(vinculo_institucional))
    var vinculo_institucionais = {}
    vinculo_institucionais.nome_vinculo_institucional =
      vinculo_institucional.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editVinculoInstitucional.json?id=${vinculo_institucional.id}`,
        vinculo_institucionais,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  saveProjeto(nome_projeto, onSave, onError) {
    var projeto = {}
    projeto.nome_projeto = nome_projeto
    axios
      .post(
        `${API_ENDPOINT}/pedido/addProjeto.json`,
        projeto,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editProjeto(projeto, onSave, onError) {
    projeto = JSON.parse(JSON.stringify(projeto))
    var projetos = {}
    projetos.nome_projeto = projeto.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editProjeto.json?id=${projeto.id}`,
        projetos,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  saveLaboratorio(nome_laboratorio, onSave, onError) {
    var laboratorio = {}
    laboratorio.nome_laboratorio = nome_laboratorio
    axios
      .post(
        `${API_ENDPOINT}/pedido/addLaboratorio.json`,
        laboratorio,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editLaboratorio(laboratorio, onSave, onError) {
    laboratorio = JSON.parse(JSON.stringify(laboratorio))
    var laboratorios = {}
    laboratorios.nome_laboratorio = laboratorio.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editLaboratorio.json?id=${laboratorio.id}`,
        laboratorios,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  saveNivelProjeto(nome_nivel_projeto, onSave, onError) {
    var nivel_projeto = {}
    nivel_projeto.nome_nivel_projeto = nome_nivel_projeto
    axios
      .post(
        `${API_ENDPOINT}/pedido/addNivelProjeto.json`,
        nivel_projeto,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editNivelProjeto(nivel_projeto, onSave, onError) {
    nivel_projeto = JSON.parse(JSON.stringify(nivel_projeto))
    var nivel_projetos = {}
    nivel_projetos.nome_nivel_projeto = nivel_projeto.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editNivelProjeto.json?id=${nivel_projeto.id}`,
        nivel_projetos,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  saveEspecie(nome_especie, onSave, onError) {
    var especie = {}
    especie.nome_especie = nome_especie
    axios
      .post(
        `${API_ENDPOINT}/pedido/addEspecie.json`,
        especie,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editEspecie(especie, onSave, onError) {
    especie = JSON.parse(JSON.stringify(especie))
    var especies = {}
    especies.nome_especie = especie.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editEspecie.json?id=${especie.id}`,
        especies,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  saveFinalidade(nome_finalidade, onSave, onError) {
    var finalidade = {}
    finalidade.nome_finalidade = nome_finalidade
    axios
      .post(
        `${API_ENDPOINT}/pedido/addFinalidade.json`,
        finalidade,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  editFinalidade(finalidade, onSave, onError) {
    finalidade = JSON.parse(JSON.stringify(finalidade))
    var finalidades = {}
    finalidades.nome_finalidade = finalidade.name
    axios
      .put(
        `${API_ENDPOINT}/pedido/editFinalidade.json?id=${finalidade.id}`,
        finalidades,
        this.buildAuthHeader()
      )
      .then(() => onSave())
      .catch((e) => onError(e))
  }

  #formatDate(data) {
    data.map((pedido) => {
      pedido.data_solicitacao = Util.formatDateTable(pedido.data_solicitacao)
      pedido.vigencia_ceua = Util.formatDateTable(pedido.vigencia_ceua)
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

  getPedidoHeadersTable() {
    const columns = [
      { field: 'processo_sei', header: 'Processo SEI' },
      { field: 'equipe_executora', header: 'Equipe Executora' },
      { field: 'data_solicitacao', header: 'Data Solicitação' },
      { field: 'titulo', header: 'Título' },
      { field: 'especificar', header: 'Especificar' },
      { field: 'exper', header: 'Exper' },
      { field: 'num_ceua', header: 'CEUA Nº' },
      { field: 'vigencia_ceua', header: 'Vigência/CEUA' },
      { field: 'num_aprovado', header: 'Nº Aprovado' },
      { field: 'num_solicitado', header: 'Nº Solicitado' },
      { field: 'adendo_1', header: 'Adendo1' },
      { field: 'adendo_2', header: 'Adendo2' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'idade', header: 'Idade' },
      { field: 'peso', header: 'Peso' },
      { field: 'observacoes', header: 'Observações' },
      { field: 'saldoCEUA', header: 'Saldo CEUA' },
      {
        field: 'vinculo_institucional.nome_vinculo_institucional',
        header: 'Vínculo Institucional'
      },
      { field: 'projeto.nome_projeto', header: 'Projeto' },
      { field: 'especie.nome_especie', header: 'Espécie' },
      {
        field: 'linha_pesquisa.nome_linha_pesquisa',
        header: 'Linha De Pesquisa'
      },
      { field: 'nivel_projeto.nome_nivel_projeto', header: 'Nível Projeto' },
      { field: 'laboratorio.nome_laboratorio', header: 'Laboratório' },
      { field: 'finalidade.nome_finalidade', header: 'Finalidade' },
      { field: 'linhagem.nome_linhagem', header: 'Linhagem' },
      { field: 'pesquisador.nome', header: 'Pesquisador' },
      { field: 'pesquisador.setor', header: 'Setor' },
      { field: 'pesquisador.instituicao', header: 'Instituição' }
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

export default new PedidoService()
