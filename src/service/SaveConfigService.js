import LinhagemService from './LinhagemService'
import PedidoService from './PedidoService'
import SalaService from './SalaService'

class SaveConfigService {
  save(name, onSave, onError) {
    if (window.location.href.includes('/config/linhagem')) {
      LinhagemService.saveLinhagem(name, onSave, onError)
    } else if (window.location.href.includes('/config/sala')) {
      SalaService.saveSala(name, onSave, onError)
    } else if (window.location.href.includes('/config/linhapesquisa')) {
        PedidoService.saveLinhaPesquisa(name, onSave, onError)
    } else if (window.location.href.includes('/config/insti')) {
        PedidoService.saveVinculoInstitucional(name, onSave, onError)
    } else if (window.location.href.includes('/config/proj')) {
        PedidoService.saveProjeto(name, onSave, onError)
    } else if (window.location.href.includes('/config/lab')) {
        PedidoService.saveLaboratorio(name, onSave, onError)
    } else if (window.location.href.includes('/config/nivelpesquisa')) {
        PedidoService.saveNivelProjeto(name, onSave, onError)
    } else if (window.location.href.includes('/config/especie')) {
        PedidoService.saveEspecie(name, onSave, onError)
    }  else if (window.location.href.includes('/config/finalidade')) {
        PedidoService.saveFinalidade(name, onSave, onError)
    }
  }

  edit(name, onSave, onError) {
    if (window.location.href.includes('/config/linhagem')) {
      LinhagemService.editLinhagem(name, onSave, onError)
    } else if (window.location.href.includes('/config/sala')) {
      SalaService.editSala(name, onSave, onError)
    } else if (window.location.href.includes('/config/linhapesquisa')) {
        PedidoService.editLinhaPesquisa(name, onSave, onError)
    } else if (window.location.href.includes('/config/insti')) {
        PedidoService.editVinculoInstitucional(name, onSave, onError)
    } else if (window.location.href.includes('/config/proj')) {
        PedidoService.editProjeto(name, onSave, onError)
    } else if (window.location.href.includes('/config/lab')) {
        PedidoService.editLaboratorio(name, onSave, onError)
    } else if (window.location.href.includes('/config/nivelpesquisa')) {
        PedidoService.editNivelProjeto(name, onSave, onError)
    } else if (window.location.href.includes('/config/especie')) {
        PedidoService.editEspecie(name, onSave, onError)
    }  else if (window.location.href.includes('/config/finalidade')) {
        PedidoService.editFinalidade(name, onSave, onError)
    }
  }
}

export default new SaveConfigService()
