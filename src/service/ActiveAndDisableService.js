import PesquisadorService from '../service/PesquisadorService'
import LinhagemService from './LinhagemService'
import PedidoService from './PedidoService'
import PrevisaoService from './PrevisaoService'
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
    } else if (window.location.href.includes('/caixa')) {
    } else if (window.location.href.includes('/tempumi')) {
      TemperaturaUmidadeService.activeAndDisableTemperaturaUmidade(
        id,
        onDelete,
        activeBool
      )
    } else if (window.location.href.includes('/cxmatriz')) {
    } else if (window.location.href.includes('/parto')) {
    } else if (window.location.href.includes('/config/linhagem')) {
      LinhagemService.activeAndDisableLinhagem(id, onDelete, activeBool)
    } else if (window.location.href.includes('/config/sala')) {
    } else if (window.location.href.includes('/config/linhapesquisa')) {
    } else if (window.location.href.includes('/config/insti')) {
    } else if (window.location.href.includes('/config/proj')) {
    } else if (window.location.href.includes('/config/lab')) {
    } else if (window.location.href.includes('/config/nivelpesquisa')) {
    } else if (window.location.href.includes('/config/especie')) {
    } else if (window.location.href.includes('/config/finalidade')) {
    }
  }
}

export default new ActiveAndDisable()
