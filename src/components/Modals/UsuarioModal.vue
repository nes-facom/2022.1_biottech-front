<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="nome">Nome</label>
        <InputText
          v-model="usuario.nome"
          id="nome"
          type="text"
          autofocus
          :class="{ 'p-invalid': required && !usuario.nome }" />
      </div>
      <div class="field col-12">
        <label for="email">Email</label>
        <InputText
          v-model="usuario.email"
          id="email"
          type="text"
          :class="{ 'p-invalid': required && !usuario.email }" />
      </div>
      <div class="field col-12">
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
              value="1"
              v-model="usuario.type"
              :class="{ 'p-invalid': required && !usuario.type }" />
            <label for="admin">Administrador</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="comum"
              name="type"
              value="0"
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
</template>

<script>
export default {
  data() {
    return {
      required: false
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
        this.usuario.nome &&
        this.usuario.email &&
        this.usuario.senha &&
        this.usuario.type
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
