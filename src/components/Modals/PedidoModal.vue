<template>
  <TabView scrollable :active-index="activeTab" ref="tabview1">
    <TabPanel :disabled="disable_1" header="1º passo">
      <div class="col-12">
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="processo_sei">Processo SEI</label>
            <InputText
              id="processo_sei"
              type="text"
              v-model="pedido.processo_sei" />
          </div>
          <div class="field col-12">
            <label for="num_ceua">N°CEUA</label>
            <InputText id="num_ceua" type="text" v-model="pedido.num_ceua" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="vigencia_ceua">Vigência CEUA</label>
            <Calendar
              id="vigencia_ceua"
              v-model="pedido.vigencia_ceua"
              dateFormat="yy-mm-dd" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="data_solicitacao">Data da solicitação</label>
            <Calendar
              id="data_solicitacao"
              v-model="pedido.data_solicitacao"
              dateFormat="yy-mm-dd" />
          </div>
          <div class="field col-12">
            <label for="saldo_ceua">Saldo CEUA</label>
            <InputText id="saldo_ceua" type="text" v-model="pedido.saldoCEUA" />
          </div>
          <div class="flex justify-content-end field col-12">
            <div class="justify-content-end">
              <Button
                label="Próximo"
                @click="() => ((disable_2 = false), (activeTab = 1))"></Button>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_2" header="2º passo">
      <div class="flex justify-content-end field col-12">
        <div class="justify-content-end">
          <Button
            label="Próximo"
            @click="() => ((disable_3 = false), (activeTab = 2))"></Button>
        </div>
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_3" header="3º passo">
      <div class="flex justify-content-end field col-12">
        <div class="justify-content-end">
          <Button
            label="Próximo"
            @click="() => ((disable_4 = false), (activeTab = 3))"></Button>
        </div>
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_4" header="4º passo">
      <div class="flex justify-content-end field col-12">
        <div class="justify-content-end">
          <Button
            label="Próximo"
            @click="() => ((disable_5 = false), (activeTab = 4))"></Button>
        </div>
      </div>
    </TabPanel>
    <TabPanel :disabled="disable_5" header="5º passo">
      <p>form</p>
    </TabPanel>
  </TabView>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      disable_1: false,
      disable_2: true,
      disable_3: true,
      disable_4: true,
      disable_5: true
    }
  },
  props: {
    pedido: Object
  },
  methods: {}
}
</script>
