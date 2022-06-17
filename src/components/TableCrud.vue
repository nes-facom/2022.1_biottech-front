<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <div class="card col-12">
          <div class="p-fluid grid justify-content-between">
            <div class="col-12 md:col-2">
              <Button
                v-if="!viewOnly"
                label="Novo"
                icon="pi pi-plus"
                class="p-button-success px-2"
                @click="openNew" />
            </div>
            <div class="col-12 md:col-2">
              <Dropdown
                id="year"
                v-model="yearSelected"
                :options="years"
                placeholder="Ano..."
                v-on:change="selectYear" />
            </div>
          </div>
        </div>

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

              <span class="block mt-2 md:mt-0">
                <div class="p-fluid flex align-items-center">
                  <InputText
                    @keyup.enter="search()"
                    placeholder="Buscar..."
                    v-model="this.searchString" />
                  <Calendar
                    id="icon"
                    :showIcon="true"
                    v-on:date-select="selectDate()"
                    v-model="this.date"
                    class="p-inputtext-sm mt-2 md:mt-0" />
                  <Button
                    v-if="this.searchString"
                    icon="pi pi-times"
                    class="p-button-text p-button-rounded p-button-danger"
                    @click="clearSearch" />
                  <Button
                    icon="pi pi-search"
                    class="p-button-text p-button-rounded p-button-help"
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
              <PesquisadorModal :pesquisador="value" :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Pedido'">
              <PedidoModal
                :pedido="value"
                :disabled="false"
                :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Previsão'">
              <PrevisaoModal :previsao="value" :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Saída'">
              <SaidaModal :saida="value" :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Caixa'">
              <CaixaModal :caixa="value" :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Temperatura e umidade'">
              <TempUmiModal :tempumi="value" :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Caixa Matriz'">
              <CaixaMatrixModal
                :caixa_matriz="value"
                :newData="newDataDialog" />
            </div>
            <div v-else-if="title === 'Parto'">
              <PartoModal :parto="value" :newData="newDataDialog" />
            </div>
            <div v-else>
              <UsuarioModal :usuario="value" :newData="newDataDialog" />
            </div>
            <template #footer>
              <Button
                label="Cancelar"
                icon="pi pi-times"
                class="p-button-text p-button-danger"
                @click="hideDialog" />
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
        <div
          class="flex"
          v-bind:class="
            page == 1 ? 'justify-content-end' : 'justify-content-between'
          ">
          <Button
            v-if="page != 1"
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
import CaixaService from '../service/CaixaService'
import PesquisadorModal from './Modals/PesquisadorModal.vue'
import PedidoModal from './Modals/PedidoModal.vue'
import PrevisaoModal from './Modals/PrevisaoModal.vue'
import Util from '../util/Util'
import SaidaModal from './Modals/SaidaModal.vue'
import CaixaModal from './Modals/CaixaModal.vue'
import TempUmiModal from './Modals/TempUmiModal.vue'
import CaixaMatrixModal from './Modals/CaixaMatrixModal.vue'
import PartoModal from './Modals/PartoModal.vue'
import UsuarioModal from './Modals/UsuarioModal.vue'
import PrevisaoService from '../service/PrevisaoService'
import TemperaturaUmidade from '../service/TemperaturaUmidadeService'
import Parto from '../service/PartoService'

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
      nextPage: false,
      date: null,
      yearSelected: null,
      years: null
    }
  },
  props: {
    viewOnly: { type: Boolean }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  created() {
    this.route = this.$route.path
    this.title = this.$route.name

    this.years = Util.getListYears()
    const date = new Date()
    this.yearSelected = date.getFullYear()
  },
  mounted() {
    this.page = 1
    document.getElementById('icon').style.display = 'none'
    this.getMethod()
  },
  methods: {
    prev() {
      this.page = this.page - 1
      this.getMethod()
      window.scrollTo(0, 0)
    },
    next() {
      this.page = this.page + 1
      this.getMethod()
      window.scrollTo(0, 0)
    },
    selectYear() {
      this.getMethod()
    },
    selectDate() {
      if (this.date) {
        this.searchString = Util.formatDate(this.date)
        this.getMethod()
      }
    },
    clearSearch() {
      this.searchString = ''
      this.getMethod()
    },
    openNew() {
      this.value = {}
      this.newDataDialog = true
      this.dataDialog = true
    },
    hideDialog() {
      this.newDataDialog = false
      this.dataDialog = false
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
      this.values = this.values.filter((val) => (val.id != this.value.id))
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
            (datas) => (
              (this.values = datas.pesquisador),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      } else if (this.route.startsWith('/pedido')) {
        if (!this.viewOnly) {
          this.headers = PedidoService.getPedidoHeaders()
          PedidoService.getPedidos(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            this.yearSelected,
            (datas) => (
              (this.values = datas.pedidos),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      } else if (this.route.startsWith('/previsao')) {
        if (!this.viewOnly) {
          this.headers = PrevisaoService.getPrevisaoHeaders()
          PrevisaoService.getPrevisoes(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            this.yearSelected,
            (datas) => (
              (this.values = datas.previsao),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      } else if (this.route.startsWith('/saida')) {
      } else if (this.route.startsWith('/caixa')) {
        if (!this.viewOnly) {
          this.headers = CaixaService.getCaixaHeaders()
          CaixaService.getCaixas(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            this.yearSelected,
            (datas) => (
              (this.values = datas.caixas),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      } else if (this.route.startsWith('/tempumi')) {
        if (!this.viewOnly) {
          this.headers = TemperaturaUmidade.getTemperaturaUmidadeHeaders()
          TemperaturaUmidade.getTemperaturaUmidade(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            this.yearSelected,
            (datas) => (
              (this.values = datas.temperatura),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      } else if (this.route.startsWith('/cxmatriz')) {
      } else if (this.route.startsWith('/parto')) {
        if (!this.viewOnly) {
          this.headers = Parto.getPartoHeaders()
          Parto.getPartos(
            this.route.startsWith('/desativado'),
            this.page,
            this.searchString,
            this.yearSelected,
            (datas) => (
              (this.values = datas.partos),
              (this.prevPage = datas.pagination.prevPage),
              (this.nextPage = datas.pagination.nextPage)
            )
          )
        }
      }
    },
    seeMore(value) {
      this.value = value
      this.seeMoreDialog = true
    }
  },
  components: {
    PesquisadorModal,
    PedidoModal,
    PrevisaoModal,
    SaidaModal,
    CaixaModal,
    TempUmiModal,
    CaixaMatrixModal,
    PartoModal,
    UsuarioModal
  }
}
</script>
