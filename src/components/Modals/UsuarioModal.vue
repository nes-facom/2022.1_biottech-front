<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div v-if="!newData" class="field col-12">
        <div class="p-inputgroup">
          <Button label="Gerar senha" @click="passwordAlertDialog = true" />
          <InputText
            v-model="newPassword"
            id="nova senha"
            disabled
            type="text"
            style="border-right: none" />
          <Button
            icon="pi pi-copy"
            @click="copy"
            class="p-button-secondary"
            :disabled="copyDisabled"
            style="
              background-color: white;
              color: black;
              border-color: #e0e0e0;
              border-left: none;
            " />
        </div>
      </div>
      <div class="field col-12">
        <label for="nome">Nome</label>
        <InputText
          v-model="usuario.name"
          id="nome"
          type="text"
          autofocus
          :class="{ 'p-invalid': required && !usuario.name }" />
      </div>
      <div class="field col-12">
        <label for="email">Email</label>
        <InputText
          v-model="usuario.username"
          id="email"
          type="text"
          :class="{ 'p-invalid': required && !usuario.username }" />
      </div>
      <div v-if="newData" class="field col-12">
        <label for="senha">Senha</label>
        <Password
          v-model="usuario.senha"
          id="senha"
          :feedback="false"
          toggleMask
          :class="{ 'p-invalid': required && !usuario.senha }" />
      </div>
      <div class="field col-12">
        <label class="mb-3">Permisssões</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="admin"
              name="type"
              :value="1"
              v-model="usuario.type"
              :class="{ 'p-invalid': required && !usuario.type }" />
            <label for="admin">Administrador</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="comum"
              name="type"
              :value="0"
              v-model="usuario.type"
              :class="{ 'p-invalid': required && !usuario.type }" />
            <label for="comum">Comum</label>
          </div>
        </div>
      </div>
      <div class="col-12">
        <Button
          label="Salvar"
          icon="pi pi-check"
          class="p-button-success"
          @click="save" />
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="passwordAlertDialog"
    :style="{ width: '450px' }"
    header="Alerta"
    :modal="true">
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span> Tem certeza que deseja gerar uma nova senha ? </span>
    </div>
    <template #footer>
      <Button
        label="Sim"
        icon="pi pi-check"
        class="p-button-text"
        @click="generateNewPassword" />
      <Button
        label="Não"
        icon="pi pi-times"
        class="p-button-text"
        @click="passwordAlertDialog = false" />
    </template>
  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      required: false,
      copyDisabled: true,
      newPassword: '',
      passwordAlertDialog: false
    }
  },
  props: {
    usuario: Object,
    newData: Boolean
  },
  methods: {
    save() {
      this.required = true
      const checked_fields = this.checkRequired()
      if (this.newData && checked_fields) {
        //TODO: Salvar quando é um novo registro
      } else if (checked_fields) {
        // TODO: Salvar o que foi editado
      }
    },
    checkRequired() {
      if (
        this.usuario.name &&
        this.usuario.username &&
        this.usuario.senha &&
        this.usuario.type
      ) {
        return true
      } else {
        return false
      }
    },
    generateNewPassword() {
      this.passwordAlertDialog = false
      this.copyDisabled = false
      this.newPassword = '123'
      //TODO: Método para gerar nova seja
      // thie.newPassword recebe a nova senha gerada
      // setar this.copyDisabled = false depois de gerar a nova senha
    },
    copy() {
      let copyPassowrd = document.getElementById('nova senha').value
      navigator.clipboard
        .writeText(copyPassowrd)
        .then(
          this.showToast(
            'success',
            'Nova senha copiada para área de transferência'
          )
        )
    },
    showToast(severity, summary, detail) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000
      })
    }
  }
}
</script>
