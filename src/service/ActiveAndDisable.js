import PesquisadorService from '../service/PesquisadorService'

class ActiveAndDisable {
  activeAndDisable(id, activeBool, onDelete) {
    if ( window.location.href.includes('/pesquisador')) {
      PesquisadorService.activeAndDisablePesquisador(id, onDelete, activeBool)
    } else if (window.location.href.includes('/pedido')) {
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
