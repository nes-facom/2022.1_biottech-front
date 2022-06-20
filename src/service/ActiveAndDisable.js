import PesquisadorService from '../service/PesquisadorService'

class ActiveAndDisable {
  activeAndDisable(path, id, activeBool, onDelete) {
    if (path == 'pesquisador') {
      PesquisadorService.activeAndDisablePesquisador(id, onDelete, activeBool)
    } else if ('pedido') {
    } else if ('previsao') {
    } else if ('saida') {
    } else if ('caixa') {
    } else if ('tempumi') {
    } else if ('cxmatriz') {
    } else if ('parto') {
    }
  }
}

export default new ActiveAndDisable()
