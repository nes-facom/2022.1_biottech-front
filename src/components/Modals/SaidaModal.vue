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
      <div class="field col-12 md:col-6">
        <label for="data_saida">Data da saída</label>
        <Calendar
          id="data_saida"
          v-model="saida.data_saida"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !saida.data_saida }" />
        <small class="p-invalid" v-if="required && !saida.data_saida">
          Campo Obrigatório
        </small>
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
          :class="{ 'p-invalid': required && !saida.num_animais }" />
        <small class="p-invalid" v-if="required && !saida.num_animais">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="sobra">Sobra</label>
        <InputNumber
          v-model="saida.sobra"
          id="sobra"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !saida.sobra }" />
        <small class="p-invalid" v-if="required && !saida.sobra">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label for="saida">Saída</label>
        <InputText
          v-model="saida.saida"
          id="saida"
          type="text"
          :class="{ 'p-invalid': required && !saida.saida }" />
        <small class="p-invalid" v-if="required && !saida.saida">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label for="tipo_saida">Tipo da saída</label>
        <Dropdown
          id="tipo_saida"
          v-model="saida.tipo_saida"
          :options="types"
          placeholder="Selecione um tipo"
          :class="{ 'p-invalid': required && !saida.tipo_saida }">
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
        <label for="previsao_id">Previsão</label>
        <Dropdown
          id="previsao_id"
          v-model="saida.previsao_id"
          :options="previsoes"
          optionLabel="previsoes"
          :filter="true"
          :disabled="saida.tipo_saida !== 'fornecimento'"
          :placeholder="
            saida.tipo_saida !== 'fornecimento'
              ? 'Previsões são apenas do tipo \'fornecimento\' '
              : 'Selecione uma previsão'
          "
          emptyFilterMessage="Nenhuma opção corresponde a busca"
          emptyMessage="Nenhuma opção disponível">
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
      <div class="field col-12">
        <label class="mb-3">Sexo</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="femea"
              name="sexo"
              value="femea"
              v-model="saida.sexo"
              :class="{ 'p-invalid': required && !saida.sexo }" />
            <label for="femea">Fêmea</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="macho"
              name="sexo"
              value="macho"
              v-model="saida.sexo"
              :class="{ 'p-invalid': required && !saida.sexo }" />
            <label for="macho">Macho</label>
          </div>
        </div>
      </div>
      <div class="field col-12">
        <label for="observacoes">Observações</label>
        <Textarea
          id="observacoes"
          type="text"
          v-model="saida.observacoes"
          :autoResize="true"
          rows="1" />
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
      types: [
        'fornecimento',
        'acasalamento',
        'eutanasia',
        'obito',
        'controle_sanitário'
      ],
      caixas: null,
      previsoes: null,
      required: false
    }
  },
  props: {
    saida: Object,
    newData: Boolean
  },
  mounted() {
    // TODO:Trazer as caixas e previsões possíveis a serem selecionadas em uma saída
  },
  methods: {
    save() {
      this.required = true
      const checked_fields = this.checkRequired()
      if (this.newData && checked_fields) {
        //TODO: Salvar quando é um novo registro
      } else if (checked_fields) {
        // TODO: Salvar o que foi editado
      }
    },
    checkRequired() {
      if (
        this.saida.data_saida &&
        this.saida.tipo_saida &&
        this.saida.num_animais &&
        this.saida.saida &&
        this.saida.sexo &&
        this.saida.sobra
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
