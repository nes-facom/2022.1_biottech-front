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
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !usuario.name">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label for="email">Email</label>
        <InputText
          v-model="usuario.username"
          id="email"
          type="text"
          :class="{ 'p-invalid': required && !usuario.username }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !usuario.username">
          Campo Obrigatório
        </small>
      </div>
      <div v-if="newData" class="field col-12">
        <label for="password">Senha</label>
        <Password
          v-model="usuario.password"
          id="password"
          :feedback="false"
          toggleMask
          :class="{ 'p-invalid': required && !usuario.password }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !usuario.password">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label class="mb-3">Permisssões</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="admin"
              name="type"
              :value="0"
              v-model="usuario.type"
              :class="{
                'p-invalid':
                  required && !(typeof this.usuario.type !== 'undefined')
              }" />
            <label for="admin">Administrador</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="comum"
              name="type"
              :value="1"
              v-model="usuario.type"
              :class="{
                'p-invalid':
                  required && !(typeof this.usuario.type !== 'undefined')
              }" />
            <label for="comum">Comum</label>
          </div>
        </div>
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !(typeof this.usuario.type !== 'undefined')">
          Campo Obrigatório
        </small>
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
import UserService from '../../service/UserService'

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
    showToast(severity, summary, detail, close) {
      if (close && typeof close !== 'undefined') {
        this.$emit('close', false)
      }
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 4000
      })
    },
    save() {
      this.required = true
      const checked_fields = this.checkRequired()
      const checked_fieldsEdit = this.checkRequiredEdit()
      if (!this.usuario.id && checked_fields) {
        UserService.saveUser(
          this.usuario,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Usuário cadastrado com sucesso',
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
      } else if (this.usuario.id && checked_fieldsEdit) {
        UserService.editUser(
          this.usuario,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Usuário edição com sucesso',
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
      }
    },
    checkRequired() {
      if (
        this.usuario.name &&
        this.usuario.username &&
        this.usuario.password &&
        typeof this.usuario.type !== 'undefined'
      ) {
        return true
      } else {
        return false
      }
    },

    checkRequiredEdit() {
      if (
        this.usuario.name &&
        this.usuario.username &&
        typeof this.usuario.type !== 'undefined'
      ) {
        return true
      } else {
        return false
      }
    },
    generateNewPassword() {
      this.passwordAlertDialog = false
      this.copyDisabled = false
      UserService.generatePassword(
        this.usuario.id,
        (datas) => (this.newPassword = datas)
      )
    },
    copy() {
      let copyPassowrd = document.getElementById('nova senha').value
      navigator.clipboard
        .writeText(copyPassowrd)
        .then(
          this.showToast(
            'success',
            'Nova senha copiada para área de transferência',
            '',
            false
          )
        )
    }
  }
}
</script>
