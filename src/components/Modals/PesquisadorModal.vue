<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="nome">Nome</label>
        <InputText
          v-model="pesquisador.nome"
          id="nome"
          type="text"
          autofocus
          :class="{ 'p-invalid': required && !pesquisador.nome }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="instituicao">Instituição</label>
        <InputText
          v-model="pesquisador.instituicao"
          id="instituicao"
          type="text"
          :class="{ 'p-invalid': required && !pesquisador.instituicao }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="setor">Setor</label>
        <InputText
          v-model="pesquisador.setor"
          id="setor"
          type="text"
          :class="{ 'p-invalid': required && !pesquisador.setor }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="pos">Pos</label>
        <InputText v-model="pesquisador.pos" id="pos" type="text" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="ramal">Ramal</label>
        <InputText v-model="pesquisador.ramal" id="ramal" type="text" />
      </div>
      <div class="field col-12">
        <label for="email">Email</label>
        <InputText
          v-model="pesquisador.email"
          id="email"
          type="text"
          :class="{ 'p-invalid': required && !pesquisador.email }" />
      </div>
      <div class="field col-12">
        <label class="mb-3">É orientador?</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="orientador1"
              name="orientador"
              :value="true"
              v-model="pesquisador.orientador" />
            <label for="orientador1">Sim</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="orientador2"
              name="orientador"
              :value="false"
              v-model="pesquisador.orientador" />
            <label for="orientador2">Não</label>
          </div>
        </div>
      </div>

      <div v-if="!newData" class="col-12 grid">
        <label
          v-if="this.pesquisador.telefones.length != 0"
          for="telefone"
          class="col-12">
          Telefones
        </label>
        <div
          v-for="tel in getArr(pesquisador.telefones)"
          :key="tel.id"
          class="field col-12 md:col-6">
          <div class="p-inputgroup">
            <InputText
              id="telefone"
              type="text"
              v-model="tel.telefone"
              class="mt-2" />
            <Button
              @click="delTel(tel)"
              icon="pi pi-times"
              class="p-button-danger mt-2" />
          </div>
        </div>
      </div>

      <div v-else class="col-12 grid">
        <label v-if="this.telefones.length != 0" for="telefone" class="col-12">
          Telefones
        </label>
        <div
          v-for="tel in telefones"
          :key="tel.num"
          class="field col-12 md:col-6">
          <div class="p-inputgroup">
            <InputText
              id="telefone"
              type="text"
              v-model="tel.num"
              class="mt-2" />
            <Button
              @click="delTel(tel)"
              icon="pi pi-times"
              class="p-button-danger mt-2" />
          </div>
        </div>
      </div>

      <div class="field col-12">
        <label for="newTel">Novo Telefone</label>
        <div class="p-inputgroup">
          <InputText id="newTel" type="text" v-model="newTel" />
          <Button
            v-if="!newData"
            icon="pi pi-plus"
            class="p-button-success"
            @click="addTel(pesquisador.telefones)" />
          <Button
            v-else
            icon="pi pi-plus"
            class="p-button-success"
            @click="addTel(telefones)" />
        </div>
      </div>
      <div class="col-12">
        <Button
          :disabled="saveButtonDisabled"
          label="Salvar"
          icon="pi pi-check"
          class="p-button-success"
          @click="save" />
      </div>
    </div>
  </div>
</template>

<script>
import PesquisadorService from '../../service/PesquisadorService'

export default {
  data() {
    return {
      newTel: null,
      telefones: [],
      required: false,
      saveButtonDisabled: false
    }
  },
  props: {
    pesquisador: Object,
    newData: Boolean
  },
  methods: {
    showToast(severity, summary, detail, close = True) {
      if (close) {
        this.$emit('close', false)
      }
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000
      })
    },
    getArr(obj) {
      const arr = Object.keys(obj).map(function (key) {
        return obj[key]
      })
      return arr
    },
    addTel(obj) {
      if (this.newTel == null) {
        this.showToast(
          'warn',
          'Insira um número válido',
          'Campo de Telefone vazio',
          false
        )
        return
      }
      if (this.newTel != null && !this.newData) {
        obj.push({
          telefone: this.newTel
        })
        this.newTel = ''
      } else {
        obj.push({
          num: this.newTel
        })
        this.newTel = ''
      }
    },
    delTel(item) {
      if (!this.newData) {
        const index = this.pesquisador.telefones.indexOf(item)
        if (index > -1) {
          this.pesquisador.telefones.splice(index, 1)
        }
      } else {
        const index = this.telefones.indexOf(item)
        if (index > -1) {
          this.telefones.splice(index, 1)
        }
      }
    },
    save() {
      this.saveButtonDisabled = true
      this.required = true
      const checked_fields = this.checkRequired()
      if (this.newData && checked_fields) {
        PesquisadorService.savePesquisador(
          this.pesquisador,
          this.telefones,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Pesquisador cadastrado com sucesso'
            ),
          (error) => {
            if (error.response) {
              this.saveButtonDisabled = false
              console.log('erro')
            } else {
              this.saveButtonDisabled = false
              console.log('Erro na requisição')
            }
          }
        )
      } else if (checked_fields) {
        PesquisadorService.editPesquisador(
          this.pesquisador,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Pesquisador editado com sucesso'
            ),
          (error) => {
            if (error.response) {
              this.saveButtonDisabled = false
              console.log('erro')
            } else {
              this.saveButtonDisabled = false
              console.log('Erro na requisição')
            }
          }
        )
      }
    },
    checkRequired() {
      if (
        this.pesquisador.nome &&
        this.pesquisador.instituicao &&
        this.pesquisador.setor &&
        this.pesquisador.email
      ) {
        return true
      } else {
        this.saveButtonDisabled = false
        return false
      }
    }
  }
}
</script>
