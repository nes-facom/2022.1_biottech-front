<template>
  <div class="layout-topbar">
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
export default {
  data() {
    return {
      visible: false,
      newPassword: null,
      cofirmPassword: null
    }
  },
  methods: {
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
      console.log(this.visible)
    },
    logOut() {
      console.log('Log out')
      //TODO: inserir método de logout
    },
    changePassword() {
      console.log('Change password')
      //TODO: salvar alteração de senha
      this.visible = false
    }
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme
    }
  }
}
</script>
