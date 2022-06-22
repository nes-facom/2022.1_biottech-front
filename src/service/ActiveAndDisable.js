import PesquisadorService from '../service/PesquisadorService'
import PedidoService from './PedidoService'

class ActiveAndDisable {
  activeAndDisable(id, activeBool, onDelete) {
    if ( window.location.href.includes('/pesquisador')) {
      PesquisadorService.activeAndDisablePesquisador(id, onDelete, activeBool)
    } else if (window.location.href.includes('/pedido')) {
      PedidoService.activeAndDisablePedido(id, onDelete, activeBool)
    } else if (window.location.href.includes('/previsao')) {
    } else if (window.location.href.includes('/saida')) {
    } else if (window.location.href.includes('/caixa')) {
    } else if (window.location.href.includes('/tempumi')) {
    } else if (window.location.href.includes('/cxmatriz')) {
    } else if (window.location.href.includes('/parto')) {
    }
  }
}

export default new ActiveAndDisable()
