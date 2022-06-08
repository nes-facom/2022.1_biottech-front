<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="caixa_matriz_numero">N° Caixa Matriz</label>
        <InputText
          id="caixa_matriz_numero"
          v-model="caixa_matriz.caixa_matriz_numero"
          autofocus />
      </div>
      <div class="field col-12">
        <label for="data_acasalamento">Data Acasalamento</label>
        <Calendar
          id="data_acasalamento"
          v-model="caixa_matriz.data_acasalamento"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="saida_da_colonia">Saída da Colônia</label>
        <Calendar
          id="saida_da_colonia"
          v-model="caixa_matriz.saida_da_colonia"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="data_obito">Data Óbito</label>
        <Calendar
          id="data_obito"
          v-model="caixa_matriz.data_obito"
          dateFormat="yy-mm-dd" />
      </div>
      <!-- <div class="field col-12">
        TODO: dropdown para escolher caixa de origem do macho
      </div>
      <div class="field col-12">
        TODO: dropdown para escolher caixa de origem da fêmea
      </div> -->
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
      caixas: null
    }
  },
  props: {
    caixa_matriz: Object,
    newData: Boolean
  },
  mounted() {
    // TODO: trazes as caixas possíveis a serem selecionadas em
    // caixa de origem macho
    // caixa de origem femea
  },
  methods: {
    save() {
      if (this.newData) {
        //TODO: Salvar quando é um novo registro
      } else {
        // TODO: Salvar o que foi editado
      }
    }
  }
}
</script>

<style></style>
