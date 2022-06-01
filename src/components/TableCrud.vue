<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar v-if="!this.viewOnly" class="mb-4">
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
          breakpoint="1000px"
          resizableColumns>
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">{{ this.title }}</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <div class="formgroup-inline">
                  <div class="field">
                    <InputText
                      @keyup.enter="search()"
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
          <Column v-if="!this.viewOnly" headerStyle="min-width:10rem;">
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

          <!-- MODAL PARA VER A ENTIDADE COMPLETA -->
          <Dialog
            v-model:visible="seeMoreDialog"
            :style="{ width: '450px' }"
            :header="this.title"
            :modal="true"
            class="p-fluid"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <!-- SE FOR A TABELA PEDIDO -->
            <PedidoModal :pedido="value" :disabled="true" />

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
            :header="'Cadastro: ' + title"
            :modal="true"
            class="p-fluid"
            :closeOnEscape="false"
            :closable="false"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <!-- DEFINE O FORMULÁRIO QUE SERÁ RENDERIZADO BASEADO NA ROTA ATUAL -->
            <div v-if="title === 'Pesquisador'">
              <PesquisadorModal
                :pesquisador="value"
                :newDataDialog="newDataDialog" />
            </div>
            <div v-else-if="title === 'Pedido'">
              <PedidoModal :pedido="value" :disabled="false" />
            </div>
            <div v-else-if="title === 'Previsão'">
              <PrevisaoModal :previsao="value" />
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
                label="Cancelar"
                icon="pi pi-times"
                class="p-button-text p-button-danger"
                @click="hideDialog" />
              <Button
                v-if="title != 'Pedido'"
                label="Save"
                icon="pi pi-check"
                class="p-button-text"
                @click="saveNew" />
            </template>
          </Dialog>

          <!-- MODAL DE ALERTA DE DELEÇÃO -->
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
                label="Não"
                icon="pi pi-times"
                class="p-button-text"
                @click="deleteDataDialog = false" />
              <Button
                label="Sim"
                icon="pi pi-check"
                class="p-button-text"
                @click="deleteData" />
            </template>
          </Dialog>
        </DataTable>
        <div class="flex justify-content-between">
          <Button
            :disabled="!prevPage"
            label="Anterior"
            icon="pi pi-arrow-left"
            class="p-button-primary mt-2"
            @click="prev" />
          <Button
            :disabled="!nextPage"
            label="Próximo"
            iconPos="right"
            icon="pi pi-arrow-right"
            class="p-button-primary mt-2"
            @click="next" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PesquisadorService from '../service/PesquisadorService'
import PedidoService from '../service/PedidoService'
import PesquisadorModal from './Modals/PesquisadorModal.vue'
import PedidoModal from './Modals/PedidoModal.vue'
import PrevisaoModal from './Modals/PrevisaoModal.vue'
import Util from '../util/Util'

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
      searchString: '',
      page: null,
      prevPage: false,
      nextPage: false
    }
  },
  props: {
    viewOnly: { type: Boolean }
  },
  entityService: null,
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  created() {
    this.route = this.$route.path
    this.title = this.$route.name
  },
  mounted() {
    this.page = 1
    this.getMethod()
  },
  methods: {
    prev() {
      this.page = this.page - 1
      this.getMethod()
    },
    next() {
      this.page = this.page + 1
      this.getMethod()
    },
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
      // this.$refs.dt.exportCSV()
      // console.log(this.route.name)
    },
    getTel(obj) {
      return Util.formatPhones(obj)
    },
    search() {
      this.getMethod()
    },
    getMethod() {
      if (this.route.startsWith('/pesquisador')) {
        if (!this.viewOnly) {
          this.headers = PesquisadorService.getPesquisadorHeaders()
          PesquisadorService.getPesquisadores(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            (datas) => (this.values = datas)
          )
        }
      } else if (this.route.startsWith('/pedido')) {
        if (!this.viewOnly) {
          this.headers = PedidoService.getPedidoHeaders()
          PedidoService.getPedidos(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            (datas) => (
              (this.values = datas.pedidos),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      } else if (this.route.startsWith('/previsao')) {
      } else if (this.route.startsWith('/saida')) {
      } else if (this.route.startsWith('/caixa')) {
      } else if (this.route.startsWith('/tempumi')) {
      } else if (this.route.startsWith('/cxmatriz')) {
      } else if (this.route.startsWith('/parto')) {
      }
    },
    seeMore(value) {
      this.value = value
      this.seeMoreDialog = true
    }
  },
  components: { PesquisadorModal, PedidoModal, PrevisaoModal }
}
</script>
