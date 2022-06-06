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
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="instituicao">Instituição</label>
        <InputText
          v-model="pesquisador.instituicao"
          id="instituicao"
          type="text"
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="setor">Setor</label>
        <InputText
          v-model="pesquisador.setor"
          id="setor"
          type="text"
          required />
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
          required />
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

      <!-- WIP: MOSTRAR TODOS OS TELEFONES E DAR OPÇÃO PARA ADICIONAR E DELETAR -->
      <div v-if="!newDataDialog" class="field col-12">
        <label for="telefone">Telefones</label>
        <div class="flex gap-3">
          <InputText
            v-for="tel in getArr(pesquisador.telefones)"
            :key="tel.id"
            id="telefone"
            type="text"
            v-model="tel.telefone" />
        </div>
      </div>
      <div class="field col-12">
        <label for="newTel">Novo Telefone</label>
        <div class="flex card-container blue-container overflow-hidden">
          <div
            class="flex-grow-1 flex align-items-center justify-content-center mr-2">
            <InputText id="newTel" type="text" v-model="newTel"></InputText>
          </div>
          <div class="flex-none flex align-items-center justify-content-center">
            <Button
              icon="pi pi-plus"
              class="p-button-success mr-2"
              @click="addTel(getArr(pesquisador.telefones))"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTel: null
    }
  },
  props: {
    pesquisador: Object,
    newDataDialog: Boolean
  },
  methods: {
    getArr(obj) {
      const arr = Object.keys(obj).map(function (key) {
        return obj[key]
      })
      return arr
    },
    addTel(arr) {
      //TODO: add novo telefone
    }
  }
}
</script>
