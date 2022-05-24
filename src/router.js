import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '',
        name: 'Configurações',
        component: () => import('./pages/TabMenu.vue'),
        redirect: '/config/linhagem',
        children: [
          {
            path: '/config/linhagem',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/sala',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/linhapesquisa',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/insti',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/proj',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/lab',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/nivelpesquisa',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/especie',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/finalidade',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/pesquisador',
        name: 'Pesquisador',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/pesquisador/desativado',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/pedido',
        name: 'pedido',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/pedido/desativado',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/previsao',
        name: 'Previsao',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/previsao/desativado',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/saida',
        name: 'Saída',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/saida/desativado',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/caixa',
        name: 'Caixa',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/caixa/desativado',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/tempumi',
        name: 'TemperaturaUmidade',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Menu temperatura e umidade',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/tempumi/desativado',
            name: 'Temperatura e umidade arquivadas',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/cxmatriz',
        name: 'Caixa Matriz',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Menu caixa matriz',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/cxmatriz/desativado',
            name: 'Caixas matrizes arquivadas',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/parto',
        name: 'Parto',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Menu parto',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/parto/desativado',
            name: 'Partos arquivados',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/exp',
        name: 'Experimentação',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '/exp/pedido',
            name: 'Pedido',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/exp/pesquisadores',
            name: 'Pesquisadores',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/exp/previsao',
            name: 'Previsão',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/exp/resultado',
            name: 'Resultado',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/criacao',
        name: 'Criação',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '/criacao/dados',
            name: 'Entrada Dados',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/criacao/saidas',
            name: 'Saídas',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/criacao/tempumi',
            name: 'Temperatura e Umidade',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      },
      {
        path: '/repro',
        name: 'Reprodução',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '/repro/nascdesma',
            name: 'Nascimento e Desmame',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/repro/matrizes',
            name: 'Matrizes',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/repro/progacasal',
            name: 'Programação Acasalamento',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/repro/controlerepro',
            name: 'Controle Reprodutivo',
            component: () => import('./components/SimpleTable.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./pages/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
