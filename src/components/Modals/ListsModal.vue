<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="nome">Nome</label>
        <InputText
          v-model="listObj.nome"
          id="nome"
          type="text"
          autofocus
          required />
      </div>
      <div v-if="title == 'Sala'" class="field col-12">
        <label for="nome">Linhagens</label>
        <MultiSelect
          v-model="listObj.linhagens"
          :options="linhagens"
          optionLabel="linhagens"
          placeholder="Selecione as linhagens"
          display="chip">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.nome_linhagem }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.nome_linhagem }}</div>
          </template>
        </MultiSelect>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linhagens: null
    }
  },
  props: {
    listObj: Object,
    title: String
  },
  mounted() {
    if (this.title == 'Sala') {
      //TODO: recuperar as linhagens possíveis
      //de serem selecionadas se a lista sendo editada/cadastrada for 'Sala'
    }
  }
}
</script>
