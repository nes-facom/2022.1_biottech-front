<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="caixa">Caixa</label>
        <Dropdown
          id="caixa"
          v-model="saida.caixa"
          :options="caixas"
          optionLabel="caixas"
          :filter="true"
          placeholder="Selecione uma caixa">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.caixa_numero }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.caixa_numero }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field col-12">
        <label for="previsao_id">Previsão</label>
        <Dropdown
          id="previsao_id"
          v-model="saida.previsao_id"
          :options="previsoes"
          optionLabel="previsoes"
          :filter="true"
          placeholder="Selecione uma previsão">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.num_previsao }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.num_previsao }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field col-12 md:col-6">
        <label for="data_saida">Data da saída</label>
        <Calendar
          id="data_saida"
          v-model="saida.data_saida"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="usuario">Usuário</label>
        <InputText v-model="saida.usuario" id="usuario" type="text" required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_animais">N°de Animais</label>
        <InputNumber
          v-model="saida.num_animais"
          id="num_animais"
          :useGrouping="false"
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="sobra">Sobra</label>
        <InputNumber
          v-model="saida.sobra"
          id="sobra"
          :useGrouping="false"
          required />
      </div>
      <div class="field col-12">
        <label for="saida">Saída</label>
        <InputText v-model="saida.saida" id="saida" type="text" required />
      </div>
      <div class="field col-12">
        <label for="tipo_saida">Tipo da saída</label>
        <Dropdown
          id="tipo_saida"
          v-model="saida.tipo_saida"
          :options="types"
          placeholder="Selecione um tipo">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field col-12">
        <label class="mb-3">Sexo</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="femea"
              name="sexo"
              value="femea"
              v-model="saida.sexo" />
            <label for="femea">Fêmea</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="macho"
              name="sexo"
              value="macho"
              v-model="saida.sexo" />
            <label for="macho">Macho</label>
          </div>
        </div>
        <div class="field col-12">
          <label for="observacoes">Observações</label>
          <Textarea
            id="observacoes"
            type="text"
            v-model="saida.observacoes"
            :autoResize="true"
            rows="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [
        'fornecimento',
        'acasalamento',
        'eutanasia',
        'obito',
        'controle_sanitário'
      ],
      caixas: null,
      previsoes: null
    }
  },
  props: {
    saida: Object
  },
  mounted() {
    // TODO:Trazer as caixas e previsões possíveis a serem selecionadas em uma saída
  }
}
</script>
