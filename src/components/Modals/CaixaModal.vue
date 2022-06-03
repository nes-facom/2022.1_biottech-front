<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <!-- <div class="field col-12">
        <label for="caixa_matriz">Caixa Matriz de origem</label>
        <Dropdown
          id="caixa_matriz"
          v-model="caixa.caixa_matriz"
          :options="caixas_matriz"
          optionLabel="Caixa matriz"
          :filter="true"
          placeholder="Selecione um caixa matriz">
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
      </div> -->
      <div class="field col-12">
        <label for="linhagem">Linhagem</label>
        <Dropdown
          id="linhagem"
          v-model="caixa.linhagem"
          :options="linhagens"
          optionLabel="Linhagem"
          :filter="true"
          placeholder="Selecione uma linhagem">
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
        </Dropdown>
      </div>
      <div class="field col-12 md:col-6">
        <label for="caixa_numero">N° da Caixa</label>
        <InputText
          v-model="caixa.caixa_numero"
          id="caixa_numero"
          type="text"
          autofocus
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="nascimento">Data de Nascimento</label>
        <Calendar
          id="nascimento"
          v-model="caixa.nascimento"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12">
        <label class="mb-3">Sexo</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="femea"
              name="sexo"
              value="femea"
              v-model="caixa.sexo" />
            <label for="femea">Fêmea</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="macho"
              name="sexo"
              value="macho"
              v-model="caixa.sexo" />
            <label for="macho">Macho</label>
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_animais">N° de Animais</label>
        <InputNumber
          autocomplete="off"
          v-model="caixa.num_animais"
          id="num_animais"
          :useGrouping="false"
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="ultima_saida">Última Saída</label>
        <Calendar
          id="ultima_saida"
          v-model="caixa.ultima_saida"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12">
        <label for="qtd_saida">Quantidade de animais retirados</label>
        <InputNumber
          autocomplete="off"
          v-model="caixa.qtd_saida"
          id="qtd_saida"
          :useGrouping="false"
          required />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caixas_matriz: null,
      linhagens: null
    }
  },
  props: {
    caixa: Object
  },
  mounted() {
    // TODO: Recuperar caixas_matriz e linhagens possíveis a serem selecionados para uma previsão
  }
}
</script>

<style></style>
