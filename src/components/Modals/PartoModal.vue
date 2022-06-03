<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <div class="field col-12">
          <label for="caixa_matriz">Caixa Matriz</label>
          <Dropdown
            id="caixa_matriz"
            v-model="parto.caixa_matriz"
            :options="caixas_matriz"
            optionLabel="Caixas Matriz"
            :filter="true"
            placeholder="Selecione uma caixa matriz">
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <div>{{ slotProps.value.caixa_matriz_numero }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div>{{ slotProps.option.caixa_matriz_numero }}</div>
            </template>
          </Dropdown>
        </div>
      </div>
      <div class="field col-12 md:col-6">
        <label for="numero_parto">N° Parto</label>
        <InputNumber
          id="numero_parto"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.numero_parto" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="data_parto">Data Parto</label>
        <Calendar
          id="data_parto"
          v-model="parto.data_parto"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_macho">N° Macho</label>
        <InputNumber
          id="num_macho"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.num_macho"
          v-tooltip.top.focus="'Número de machos nascidos'" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_femea">N° Fêmea</label>
        <InputNumber
          id="num_femea"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.num_femea"
          v-tooltip.top.focus="'Número de fêmeas nascidas'" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="des_macho">N° Machos Desmamados</label>
        <InputNumber
          id="des_macho"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.des_macho" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="des_femea">N° Fêmea Desmamadas</label>
        <InputNumber
          id="des_femea"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.des_femea" />
      </div>
      <div class="field col-12">
        <Divider align="center">
          <b>Óbitos</b>
        </Divider>
      </div>
      <div class="field col-12 md:col-4">
        <label for="qtd_canib">Canibalizados</label>
        <InputNumber
          id="qtd_canib"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.qtd_canib" />
      </div>
      <div class="field col-12 md:col-4">
        <label for="qtd_gamba">Gambás</label>
        <InputNumber
          id="qtd_gamba"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.qtd_gamba" />
      </div>
      <div class="field col-12 md:col-4">
        <label for="qtd_outros">Outros</label>
        <InputNumber
          id="qtd_outros"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.qtd_outros" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caixas_matriz: null
    }
  },
  props: {
    parto: Object
  },
  mounted() {
    // TODO: trazes as caixas_matriz possíveis a serem selecionadas
  }
}
</script>

<style></style>
