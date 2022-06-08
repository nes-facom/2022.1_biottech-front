<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="nome">{{ label }}</label>
        <InputText v-model="value" id="nome" type="text" autofocus />
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
      linhagens: null,
      label: 'Nome',
      value: null
    }
  },
  props: {
    listObj: Object,
    title: String,
    newData: Boolean
  },
  mounted() {
    this.getNome()
    if (this.title == 'Sala') {
      this.label = 'Número da Sala'
      //TODO: recuperar as linhagens possíveis
      //de serem selecionadas se a lista sendo editada/cadastrada for 'Sala'
    }
  },
  methods: {
    getNome() {
      if (this.title == 'Linhagem') {
        this.value = this.listObj.nome_linhagem
      } else if (this.title == 'Sala') {
        this.value = this.listObj.num_sala
      } else if (this.title == 'Linha de Pesquisa') {
        this.value = this.listObj.nome_linha_pesquisa
      } else if (this.title == 'Vínculo Institucional') {
        this.value = this.listObj.nome_vinculo_institucional
      } else if (this.title == 'Projeto') {
        this.value = this.listObj.nome_projeto
      } else if (this.title == 'Laboratório') {
        this.value = this.listObj.nome_laboratorio
      } else if (this.title == 'Nível de Pesquisa') {
        this.value = this.listObj.nome_nivel_projeto
      } else if (this.title == 'Espécie') {
        this.value = this.listObj.nome_especie
      } else if (this.title == 'Finalidade') {
        this.value = this.listObj.nome_finalidade
      }
    },
    save() {
      if (this.newData) {
        console.log('novo')
        //TODO: Salvar quando é um novo registro
      } else {
        console.log('editar')
        // TODO: Salvar o que foi editado
      }
    }
  }
}
</script>
