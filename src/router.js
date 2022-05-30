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
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Pesquisador',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/pesquisador/desativado',
            name: 'Pesquisadores Arquivados',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          }
        ]
      },
      {
        path: '/pedido',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Pedido',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/pedido/desativado',
            name: 'Pedidos Arquivados',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          }
        ]
      },
      {
        path: '/previsao',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Previsão',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/previsao/desativado',
            name: 'Previsões Arquivadas',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          }
        ]
      },
      {
        path: '/saida',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Saída',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/saida/desativado',
            name: 'Saídas Arquivadas',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
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
            name: 'Caixa',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/caixa/desativado',
            name: 'Caixas Arquivadas',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          }
        ]
      },
      {
        path: '/tempumi',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Temperatura e umidade',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/tempumi/desativado',
            name: 'Temperatura e umidade Arquivadas',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          }
        ]
      },
      {
        path: '/cxmatriz',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          }
        },
        children: [
          {
            path: '',
            name: 'Caixa Matriz',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/cxmatriz/desativado',
            name: 'Caixas Matrizes Arquivadas',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
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
            name: 'Parto',
            component: () => import('./components/TableCrud.vue')
          },
          {
            path: '/parto/desativado',
            name: 'Partos Arquivados',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
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
            name: 'Pedidos',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/exp/pesquisadores',
            name: 'Pesquisadores',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/exp/previsao',
            name: 'Previsão',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
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
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/criacao/saidas',
            name: 'Saídas',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/criacao/tempumi',
            name: 'Temperatura e Umidade',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
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
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/repro/matrizes',
            name: 'Matrizes',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/repro/progacasal',
            name: 'Programação Acasalamento',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
          },
          {
            path: '/repro/controlerepro',
            name: 'Controle Reprodutivo',
            component: () => import('./components/TableCrud.vue'),
            props: { viewOnly: true }
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
