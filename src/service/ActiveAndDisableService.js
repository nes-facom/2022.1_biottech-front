import PesquisadorService from '../service/PesquisadorService'
import LinhagemService from './LinhagemService'
import PartoService from './PartoService'
import PedidoService from './PedidoService'
import PrevisaoService from './PrevisaoService'
import SaidaService from './SaidaService'
import SalaService from './SalaService'
import TemperaturaUmidadeService from './TemperaturaUmidadeService'

class ActiveAndDisable {
  activeAndDisable(id, activeBool, onDelete) {
    if (window.location.href.includes('/pesquisador')) {
      PesquisadorService.activeAndDisablePesquisador(id, onDelete, activeBool)
    } else if (window.location.href.includes('/pedido')) {
      PedidoService.activeAndDisablePedido(id, onDelete, activeBool)
    } else if (window.location.href.includes('/previsao')) {
      PrevisaoService.activeAndDisablePrevisao(id, onDelete, activeBool)
    } else if (window.location.href.includes('/saida')) {
      SaidaService.activeAndDisableSaida(id, onDelete, activeBool)
    } else if (window.location.href.includes('/caixa')) {
    } else if (window.location.href.includes('/tempumi')) {
      TemperaturaUmidadeService.activeAndDisableTemperaturaUmidade(
        id,
        onDelete,
        activeBool
      )
    } else if (window.location.href.includes('/cxmatriz')) {
    } else if (window.location.href.includes('/parto')) {
      PartoService.activeAndDisableParto(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/linhagem')) {
      LinhagemService.activeAndDisableLinhagem(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/sala')) {
      SalaService.activeAndDisableSala(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/linhapesquisa')) {
      PedidoService.activeAndDisableLinhaPesquisa(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/insti')) {
      PedidoService.activeAndDisableVinculoInstitucional(
        id,
        onDelete,
        activeBool
      )
    } else if (window.location.href.includes('/config/proj')) {
      PedidoService.activeAndDisableProjeto(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/lab')) {
      PedidoService.activeAndDisableLaboratorio(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/nivelpesquisa')) {
      PedidoService.activeAndDisableNivelProjeto(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/especie')) {
      PedidoService.activeAndDisableEspecie(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/finalidade')) {
      PedidoService.activeAndDisableFinalidade(id, onDelete, activeBool)
    }
  }
}

export default new ActiveAndDisable()
