<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view :key="$route.fullPath" />
      </div>
      <AppFooter />
    </div>

    <!--<AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />-->
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"></div>
    </transition>
  </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue'
import AppMenu from './AppMenu.vue'
import AppConfig from './AppConfig.vue'
import AppFooter from './AppFooter.vue'
import AuthService from './service/AuthService'

export default {
  emits: ['change-theme'],
  data() {
    return {
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: 'Início',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-chart-line',
              to: '/'
            }
          ]
        },
        {
          label: 'Experimentação',
          items: [
            {
              label: 'Pesquisador',
              icon: 'pi pi-fw pi-id-card',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/pesquisador'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/pesquisador/desativado'
                }
              ]
            },
            {
              label: 'Pedido',
              icon: 'pi pi-fw pi-envelope',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/pedido'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/pedido/desativado'
                }
              ]
            },
            {
              label: 'Previsão',
              icon: 'pi pi-fw pi-calendar',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/previsao'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/previsao/desativado'
                }
              ]
            }
          ]
        },
        {
          label: 'Criação',
          items: [
            {
              label: 'Saída',
              icon: 'pi pi-fw pi-sign-out',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/saida'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/saida/desativado'
                }
              ]
            },
            {
              label: 'Caixa',
              icon: 'pi pi-fw pi-box',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/caixa'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/caixa/desativado'
                }
              ]
            },
            {
              label: 'Temperatura & Umidade',
              icon: 'pi pi-fw pi-sun',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/tempumi'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/tempumi/desativado'
                }
              ]
            }
          ]
        },
        {
          label: 'Reprodução',
          items: [
            {
              label: 'Caixa Matriz',
              icon: 'pi pi-fw pi-box',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/cxmatriz'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/cxmatriz/desativado'
                }
              ]
            },
            {
              label: 'Parto',
              icon: 'pi pi-fw pi-inbox',
              items: [
                {
                  label: 'Menu',
                  icon: 'pi pi-fw pi-pencil',
                  to: '/parto'
                },
                {
                  label: 'Arquivados',
                  icon: 'pi pi-fw pi-folder',
                  to: '/parto/desativado'
                }
              ]
            }
          ]
        },
        {
          label: 'Tabelas',
          icon: 'pi pi-fw pi-chart-line',
          items: [
            {
              label: 'Experimentação',
              icon: 'pi pi-fw pi-circle-fill',
              items: [
                {
                  label: 'Pedidos',
                  icon: 'pi pi-fw pi-circle',
                  to: '/exp/pedido'
                },
                {
                  label: 'Cadastro Pesquisadores',
                  icon: 'pi pi-fw pi-circle',
                  to: '/exp/pesquisadores'
                },
                {
                  label: 'Previsão',
                  icon: 'pi pi-fw pi-circle',
                  to: '/exp/previsao'
                }
              ]
            },
            {
              label: 'Criação',
              icon: 'pi pi-fw pi-circle-fill',
              items: [
                {
                  label: 'Entrada Dados',
                  icon: 'pi pi-fw pi-circle',
                  to: '/criacao/dados'
                },
                {
                  label: 'Saídas',
                  icon: 'pi pi-fw pi-circle',
                  to: '/criacao/saidas'
                },
                {
                  label: 'Temperatura e Umidade',
                  icon: 'pi pi-fw pi-circle',
                  to: '/criacao/tempumi'
                }
              ]
            },
            {
              label: 'Reprodução',
              icon: 'pi pi-fw pi-circle-fill',
              items: [
                {
                  label: 'Nascimento e Desmame',
                  icon: 'pi pi-fw pi-circle',
                  to: '/repro/nascdesma'
                },
                {
                  label: 'Matrizes',
                  icon: 'pi pi-fw pi-circle',
                  to: '/repro/matrizes'
                },
                {
                  label: 'Programação Acasalamento',
                  icon: 'pi pi-fw pi-circle',
                  to: '/repro/progacasal'
                },
                {
                  label: 'Controle Reprodutivo',
                  icon: 'pi pi-fw pi-circle',
                  to: '/repro/controlerepro'
                }
              ]
            }
          ]
        },
        {
          label: 'Listas',
          items: [
            {
              label: 'Configurações',
              icon: 'pi pi-fw pi-list',
              to: '/config'
            }
          ]
        },(AuthService.getJWTTokenData() == 0) ?
        {
          label: 'Administração',
          items: [
            {
              label: 'Usuários',
              icon: 'pi pi-fw pi-users',
              to: '/users'
            }
          ]
        } : {}
      ]
    }
  },
  watch: {
    $route() {
      this.menuActive = false
      this.$toast.removeAllGroups()
    }
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }

      this.menuClick = false
    },
    onMenuToggle() {
      this.menuClick = true

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true
          }

          this.overlayMenuActive = !this.overlayMenuActive
          this.mobileMenuActive = false
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive
      }

      event.preventDefault()
    },
    onSidebarClick() {
      this.menuClick = true
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className)
      else element.className += ' ' + className
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className)
      else
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        )
    },
    isDesktop() {
      return window.innerWidth >= 992
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static') return !this.staticMenuInactive
        else if (this.layoutMode === 'overlay') return this.overlayMenuActive
      }

      return true
    }
  },
  computed: {
    containerClass() {
      return [
        'layout-wrapper',
        {
          'layout-overlay': this.layoutMode === 'overlay',
          'layout-static': this.layoutMode === 'static',
          'layout-static-sidebar-inactive':
            this.staticMenuInactive && this.layoutMode === 'static',
          'layout-overlay-sidebar-active':
            this.overlayMenuActive && this.layoutMode === 'overlay',
          'layout-mobile-sidebar-active': this.mobileMenuActive,
          'p-input-filled': this.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': this.$primevue.config.ripple === false
        }
      ]
    },
    logo() {
      return this.$appState.darkTheme
        ? 'images/logo-white.svg'
        : 'images/logo.svg'
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden')
    else this.removeClass(document.body, 'body-overflow-hidden')
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    AppConfig: AppConfig,
    AppFooter: AppFooter
  }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
