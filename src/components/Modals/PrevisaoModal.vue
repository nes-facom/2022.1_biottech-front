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
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="retirada_num">N° Retirada</label>
        <InputNumber
          autocomplete="off"
          v-model="previsao.retirada_num"
          id="retirada_num"
          :useGrouping="false"
          required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="qtd_retirar">Quantidade a retirar</label>
        <InputNumber
          v-model="previsao.qtd_retirar"
          id="qtd_retirar"
          :useGrouping="false"
          required />
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
          placeholder="Selecione um pedido">
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
    </div>
  </div>
</template>

<script>
// import Pedido from '../../service/PedidoService'
export default {
  data() {
    return {
      pedidos: null
    }
  },
  props: {
    previsao: Object
  },
  pedidoService: null,
  created() {
    // this.pedidoService = new Pedido()
  },
  mounted() {
    // this.pedidoService.getPedido().then((data) => (this.pedidos = data))
  },
  methods: {
    salvar() {
      //TODO: SALVAR O PEDIDO
    }
  }
}
</script>

<style></style>
