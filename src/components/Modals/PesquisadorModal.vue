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
      <div class="field col-12">
        <label for="telefone">Telefones</label>
        <InputText id="telefone" type="text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pesquisador: Object
  }
}
</script>
