import PesquisadorService from '../service/PesquisadorService'
import CaixaMatrizService from './CaixaMatrizService'
import CaixaService from './CaixaService'
import LinhagemService from './LinhagemService'
import PartoService from './PartoService'
import PedidoService from './PedidoService'
import PrevisaoService from './PrevisaoService'
import SaidaService from './SaidaService'
import SalaService from './SalaService'
import TemperaturaUmidadeService from './TemperaturaUmidadeService'
import UserService from './UserService'

class GetTablesService {
  getTables(page, searchString, yearSelected, onFetch, onHeaders) {
    if (window.location.href.includes('/exp/pedido')) {
      PedidoService.getPedidosTable(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/exp/pesquisadores')) {
      PesquisadorService.getPesquisadores(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/exp/previsao')) {
      PrevisaoService.getPrevisaoTable(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/criacao/dados')) {
      CaixaService.getEntradaDados(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/criacao/saidas')) {
      SaidaService.getSaidasTable(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/criacao/tempumi')) {
      TemperaturaUmidadeService.getTemperaturaUmidade(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/repro/nascdesma')) {
      PartoService.getNascDesma(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/repro/matrizes')) {
      CaixaMatrizService.getCaixaMatrizesTable(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/repro/progacasal')) {
      CaixaMatrizService.getProgramacaoAcasalamento(
        false,
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/users')) {
      UserService.getUsers(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/a')) {
      PedidoService.getPedidos(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/a')) {
      PedidoService.getPedidos(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/pesquisador')) {
      PesquisadorService.getPesquisadores(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/pedido')) {
      PedidoService.getPedidos(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/previsao')) {
      PrevisaoService.getPrevisoes(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/saida')) {
      SaidaService.getSaidas(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/caixa')) {
      CaixaService.getCaixas(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/tempumi')) {
      TemperaturaUmidadeService.getTemperaturaUmidade(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/cxmatriz')) {
      CaixaMatrizService.getCaixaMatrizes(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    } else if (window.location.href.includes('/parto')) {
      PartoService.getPartos(
        window.location.href.includes('/desativado'),
        page,
        searchString,
        yearSelected,
        onFetch,
        onHeaders
      )
    }
  }
}

export default new GetTablesService()
