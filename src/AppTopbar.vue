<template>
  <div class="layout-topbar">
    <Toast />
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle">
      <i class="pi pi-bars" />
    </button>
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
    </router-link>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true
      }">
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button @click="showModal()" class="p-link layout-topbar-button">
          <i class="pi pi-user-edit"></i>
          <span>Alterar senha</span>
        </button>
      </li>
      <li>
        <button @click="logOut()" class="p-link layout-topbar-button">
          <i class="pi pi-sign-out"></i>
          <span>Sair</span>
        </button>
      </li>
    </ul>
    <Dialog
      position="top"
      v-model:visible="visible"
      :modal="true"
      :breakpoints="{ '960px': '50vw', '640px': '100vw' }"
      :style="{ width: '30vw' }">
      <template #header>
        <h3>Alterar senha</h3>
      </template>
      <div class="felx justify-content-center grid p-fluid mt-2">
        <div class="col-11">
          <div class="mb-4">
            <h5>Nova senha</h5>
            <InputText type="text" v-model="newPassword" />
          </div>
          <div>
            <h5>Confirmar Senha</h5>
            <InputText type="text" v-model="cofirmPassword" />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-content-between mt-2">
          <Button
            @click="this.visible = false"
            label="Cancelar"
            class="p-button-danger p-button-outlined" />
          <Button
            @click="changePassword()"
            label="Salvar"
            class="p-button-success" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from './service/UserService'

export default {
  data() {
    return {
      visible: false,
      newPassword: null,
      cofirmPassword: null
    }
  },
  methods: {
    showToast(severity, summary, detail, close) {
      if (close && typeof close !== 'undefined') {
        this.visible = false
      }

      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000
      })
    },
    onMenuToggle(event) {
      this.$emit('menu-toggle', event)
    },
    onTopbarMenuToggle(event) {
      this.$emit('topbar-menu-toggle', event)
    },
    topbarImage() {
      return 'images/logo/png/logo-text-r.png'
    },
    showModal() {
      this.visible = true
    },
    logOut() {
      sessionStorage.clear()
      location.reload()
    },
    changePassword() {
      if (this.newPassword) {
        if (this.cofirmPassword) {
          if (
            this.newPassword === this.cofirmPassword &&
            this.newPassword &&
            this.cofirmPassword
          ) {
            var user = {}
            user.password = this.newPassword

            UserService.changePasswordUser(
              user,
              () =>
                this.showToast(
                  'success',
                  'Senha editada com sucesso',
                  '',
                  true
                ),
              (error) => {
                if (error.response) {
                  this.showToast(
                    'error',
                    'Tivemos um Problema',
                    error.response.data.message,
                    true
                  )
                } else {
                  this.showToast(
                    'error',
                    'Tivemos um Problema',
                    'Tente novamente mais tarde.',
                    true
                  )
                }
              }
            )
          } else {
            this.showToast('warn', 'As senhas não correspondem', '', false)

            this.newPassword = ''
            this.cofirmPassword = ''
          }
        } else {
          this.showToast('warn', 'Confirmação de senha não pode ser vazia', '', false)
        }
      } else {
        this.showToast('warn', 'Nova senha não pode ser vazia', '', false)
      }
    }
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme
    }
  }
}
</script>
