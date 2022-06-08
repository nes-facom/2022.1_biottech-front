<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="sala">Sala</label>
        <Dropdown
          id="sala"
          v-model="tempumi.sala"
          :options="salas"
          optionLabel="Salas"
          :filter="true"
          placeholder="Selecione uma sala">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.num_sala }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.num_sala }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field col-12">
        <label for="data">Data</label>
        <Calendar id="data" v-model="tempumi.data" dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="temp_matutino">Temp. Matutino</label>
        <InputNumber
          id="temp_matutino"
          mode="decimal"
          :useGrouping="false"
          v-model="tempumi.temp_matutino" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="ur_matutino">U.R. Matutino</label>
        <InputText
          id="ur_matutino"
          v-model="tempumi.ur_matutino"
          v-tooltip.top.focus="'Em %'" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="temp_vespertino">Temp. Vespertino</label>
        <InputNumber
          id="temp_vespertino"
          mode="decimal"
          :useGrouping="false"
          v-model="tempumi.temp_vespertino" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="ur_vespertino">U.R. Vespertino</label>
        <InputText
          id="ur_vespertino"
          v-model="tempumi.ur_vespertino"
          v-tooltip.top.focus="'Em %'" />
      </div>
      <div class="field col-12">
        <label for="observacoes">Observações</label>
        <Textarea
          id="observacoes"
          type="text"
          v-model="tempumi.observacoes"
          :autoResize="true"
          rows="2" />
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
      salas: null
    }
  },
  props: {
    tempumi: Object,
    newData: Boolean
  },
  mounted() {
    //TODO: Recuperar as salas possívei a serem selecionadas
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
