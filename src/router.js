import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { JWT_TOKEN_NAME } from "../src/constants"

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('./components/Dashboard.vue')
      },
      {
        path: '/config',
        name: 'Configurações',
        component: () => import('./pages/TabMenu.vue'),
        redirect: '/config/linhagem',
        children: [
          {
            path: '/config/linhagem',
            name: 'Linhagem',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/sala',
            name: 'Sala',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/linhapesquisa',
            name: 'Linha de Pesquisa',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/insti',
            name: 'Vínculo Institucional',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/proj',
            name: 'Projeto',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/lab',
            name: 'Laboratório',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/nivelpesquisa',
            name: 'Nível de Pesquisa',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/especie',
            name: 'Espécie',
            component: () => import('./components/SimpleTable.vue')
          },
          {
            path: '/config/finalidade',
            name: 'Finalidade',
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
            name: 'Previsões',
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem(JWT_TOKEN_NAME);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
