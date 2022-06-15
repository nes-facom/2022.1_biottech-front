<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="num_previsao">N° Previsão</label>
        <InputText
          v-model="previsao.num_previsao"
          id="num_previsao"
          type="text"
          autofocus
          :class="{ 'p-invalid': required && !previsao.num_previsao }" />
        <small class="p-invalid" v-if="required && !previsao.num_previsao">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="retirada_num">N° Retirada</label>
        <InputNumber
          autocomplete="off"
          v-model="previsao.retirada_num"
          id="retirada_num"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !previsao.retirada_num }" />
        <small class="p-invalid" v-if="required && !previsao.retirada_num">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="qtd_retirar">Quantidade a retirar</label>
        <InputNumber
          v-model="previsao.qtd_retirar"
          id="qtd_retirar"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !previsao.qtd_retirar }" />
        <small class="p-invalid" v-if="required && !previsao.qtd_retirar">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="retirada_data">Data da retirada</label>
        <Calendar
          id="retirada_data"
          v-model="previsao.retirada_data"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12">
        <label for="pedido">Pedido</label>
        <Dropdown
          id="pedido"
          v-model="previsao.pedido"
          :options="pedidos"
          optionLabel="Pedido"
          :filter="true"
          placeholder="Selecione um pedido"
          emptyFilterMessage="Nenhuma opção corresponde a busca"
          emptyMessage="Nenhuma opção disponível"
          :class="{ 'p-invalid': required && !previsao.pedido }">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.processo_sei }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.processo_sei }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field col-12">
        <label for="status">Status</label>
        <Dropdown
          id="status"
          v-model="previsao.status"
          :options="statuses"
          placeholder="Selecione um status"
          :class="{ 'p-invalid': required && !previsao.status }">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.value }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.label }}</div>
          </template>
        </Dropdown>
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
      pedidos: null,
      statuses: [
        { label: 'Aberto', value: 'Aberto' },
        { label: 'Fechado', value: 'Fechado' }
      ],
      required: false
    }
  },
  props: {
    previsao: Object,
    newData: Boolean
  },
  mounted() {
    // TODO: Recuperar pedidos possíveis a serem selecionados para uma previsão
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
        this.previsao.num_previsao &&
        this.previsao.retirada_num &&
        this.previsao.qtd_retirar &&
        this.previsao.pedido &&
        this.previsao.status
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
