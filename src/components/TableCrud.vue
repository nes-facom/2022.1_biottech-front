<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="Novo"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew" />
            </div>
          </template>

          <!-- EXPORTAR OS DADOS -> BAIXA PRIORIDADE -->
          <!-- <template v-slot:end>
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)" />
          </template> -->
        </Toolbar>

        <DataTable
          ref="dt"
          :rowHover="true"
          :value="values"
          dataKey="id"
          :rows="10"
          :lazy="true"
          showGridlines
          stripedRows
          responsiveLayout="stack"
          breakpoint="1530px">
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">{{ this.title }}</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <div class="formgroup-inline">
                  <div class="field">
                    <InputText
                      placeholder="Buscar..."
                      v-model="this.searchString" />
                  </div>
                  <Button
                    icon="pi pi-search"
                    class="p-button-help"
                    @click="search()" />
                </div>
              </span>
            </div>
          </template>
          <template #empty> Sem registros na tabela </template>
          <template #loading> Carregando... </template>

          <Column
            v-for="col of this.headers"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            headerStyle="width:20%; min-width:8rem;">
            <!-- RENDERIZAÇÃO CONDICIONAL CASO A ENTIDADE POSSUA ATRIBUTO TELEFONE -->
            <template #body="slotProps" v-if="col.field === 'telefones'">
              <Textarea
                :value="getTel(slotProps.data.telefones)"
                :autoResize="true"
                rows="2"
                cols="15"
                disabled
                style="color: black" />
            </template>
          </Column>
          <!-- RENDERIZAÇÃO CONDICIONAL CASO A ROTA SEJA REFERENTE A PEDIDO -->
          <Column
            v-if="this.title === 'Pedido'"
            header="Ver mais"
            headerStyle="min-width:8rem;">
            <template #body="slotProps">
              <div class="flex justify-content-center">
                <Button
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-secondary mr-2"
                  @click="seeMore(slotProps.data)" />
              </div>
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <div class="flex justify-content-center gap-2">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-success"
                  @click="edit(slotProps.data)" />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="confirmDeleteRecord(slotProps.data)" />
              </div>
            </template>
          </Column>

          <!-- WIP -->
          <!-- MODAL PARA VER A ENTIDADE COMPLETA -->
          <Dialog
            v-model:visible="seeMoreDialog"
            :style="{ width: '450px' }"
            :header="this.title"
            :modal="true"
            class="p-fluid">
            <div class="col-12 md:col-4">
              <p>TODO: add infos</p>
            </div>
            <template #footer>
              <Button
                label="Cancelar"
                icon="pi pi-times"
                class="p-button-text"
                @click="seeMoreDialog = false" />
            </template>
          </Dialog>

          <!-- WIP -->
          <!-- MODAL PARA CADASTRO -->
          <Dialog
            v-model:visible="dataDialog"
            :style="{ width: '450px' }"
            header="Cadastro"
            :modal="true"
            class="p-fluid"
            :closeOnEscape="false"
            :closable="false">
            <div v-if="title === 'Pesquisador'">
              <NewPesquisadorModal v-if="newDataDialog" :pesquisador="value" />
              <PesquisadorModal v-else :pesquisador="value" />
            </div>
            <div v-else-if="title === 'Pedido'">
              <p v-if="newDataDialog">Modais de cadastro de pedido</p>
              <PedidoModal v-else :pedido="value" />
            </div>
            <div v-else-if="title === 'Previsão'">
              <p>Modais de previsão</p>
            </div>
            <div v-else-if="title === 'Saída'">
              <p>Modais de saída</p>
            </div>
            <div v-else-if="title === 'Caixa'">
              <p>Modais de caixa</p>
            </div>
            <div v-else-if="title === 'Temperatura & Umidade'">
              <p>Modais de tempumi</p>
            </div>
            <div v-else-if="title === 'Caixa Matriz'">
              <p>Modais de caixa matriz</p>
            </div>
            <div v-else>
              <p>Modais de parto</p>
            </div>
            <template #footer>
              <Button
                label="Cancel"
                icon="pi pi-times"
                class="p-button-text"
                @click="hideDialog" />
              <Button
                label="Save"
                icon="pi pi-check"
                class="p-button-text"
                @click="saveNew" />
            </template>
          </Dialog>

          <Dialog
            v-model:visible="deleteDataDialog"
            :style="{ width: '450px' }"
            header="Alerta"
            :modal="true">
            <div class="flex align-items-center justify-content-center">
              <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem" />
              <span v-if="value"
                >Tem certeza que deseja deletar <b>{{ value.nome }}</b
                >?</span
              >
            </div>
            <template #footer>
              <Button
                label="No"
                icon="pi pi-times"
                class="p-button-text"
                @click="deleteDataDialog = false" />
              <Button
                label="Yes"
                icon="pi pi-check"
                class="p-button-text"
                @click="deleteData" />
            </template>
          </Dialog>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import Pesquisador from '../service/PesquisadorService'
import Pedido from '../service/PedidoService'
import PesquisadorModal from './Modals/PesquisadorModal.vue'
import NewPesquisadorModal from './Modals/NewPesquisadorModal.vue'
import PedidoModal from './Modals/PedidoModal.vue'

export default {
  data() {
    return {
      values: null,
      dataDialog: false,
      newDataDialog: false,
      deleteDataDialog: false,
      seeMoreDialog: false,
      value: {},
      headers: null,
      route: null,
      title: null,
      searchString: null
    }
  },
  entityService: null,
  created() {
    this.route = this.$route.path
    this.getEntity()
  },
  mounted() {
    this.getMethod()
  },
  methods: {
    openNew() {
      this.value = {}
      // this.submitted = false
      this.newDataDialog = true
      this.dataDialog = true
    },
    hideDialog() {
      this.newDataDialog = false
      this.dataDialog = false
      // this.submitted = false
    },
    saveNew() {
      // this.submitted = true
      //SALVAR
    },
    edit(entityData) {
      this.value = { ...entityData }
      this.dataDialog = true
    },
    confirmDeleteRecord(value) {
      this.value = value
      this.deleteDataDialog = true
    },
    deleteData() {
      this.values = this.values.filter((val) => (val.id = this.value.id))
      this.deleteDataDialog = false
      this.value = {}
      this.$toast.add({
        severity: 'Sucesso',
        summary: 'Sucesso',
        detail: 'Registro deletado',
        life: 3000
      })
    },
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].id === id) {
          index = i
          break
        }
      }
      return index
    },
    exportCSV() {
      this.$refs.dt.exportCSV()
    },
    getTel(obj) {
      const arr = Object.keys(obj).map(function (key) {
        return obj[key]
      })
      let str = ''
      arr.forEach((element) => {
        if (str == '') {
          str += element.telefone
        } else {
          str += '\n' + element.telefone
        }
      })
      return str
    },
    search() {
      //TODO: add método de busca
      this.searchString = ''
    },
    getEntity() {
      if (this.route == '/pesquisador') {
        this.entityService = new Pesquisador()
        this.title = 'Pesquisador'
      } else if (this.route == '/pedido') {
        this.entityService = new Pedido()
        this.title = 'Pedido'
      } else if (this.route == '/previsao') {
        this.title = 'Previsão'
        console.log('previsao')
      } else if (this.route == '/saida') {
        this.title = 'Saída'
        console.log('saida')
      } else if (this.route == '/caixa') {
        this.title = 'Caixa'
        console.log('caixa')
      } else if (this.route == '/tempumi') {
        this.title = 'Temperatura & Umidade'
        console.log('tempumi')
      } else if (this.route == '/cxmatriz') {
        this.title = 'Caixa Matriz'
        console.log('cxmatriz')
      } else if (this.route == '/parto') {
        this.title = 'Parto'
        console.log('parto')
      }
    },
    getMethod() {
      if (this.route == '/pesquisador') {
        this.entityService.getPesquisador().then((data) => (this.values = data))
        this.headers = this.entityService.getPesquisadorHeaders()
      } else if (this.route == '/pedido') {
        this.entityService.getPedido().then((data) => (this.values = data))
        this.headers = this.entityService.getPedidoHeaders()
      } else if (this.route == '/previsao') {
        console.log('previsao')
      } else if (this.route == '/saida') {
        console.log('saida')
      } else if (this.route == '/caixa') {
        console.log('caixa')
      } else if (this.route == '/tempumi') {
        console.log('tempumi')
      } else if (this.route == '/cxmatriz') {
        console.log('cxmatriz')
      } else if (this.route == '/parto') {
        console.log('parto')
      }
    },
    seeMore(value) {
      this.value = value
      this.seeMoreDialog = true
    }
  },
  components: { PesquisadorModal, NewPesquisadorModal, PedidoModal }
}
</script>
