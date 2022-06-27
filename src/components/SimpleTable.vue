<!-- WIP -->
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <h5>{{ this.title }}</h5>
        <DataTable
          ref="dt"
          :rowHover="true"
          :value="values"
          dataKey="id"
          :rows="10"
          :filters="filters"
          :loading="loading"
          stripedRows
          responsiveLayout="stack"
          breakpoint="1000px"
          resizableColumns
          v-model:filters="filters"
          filterDisplay="menu"
          class="p-datatable-gridlines">
          <template #header>
            <div
              class="flex justify-content-between align-items-center flex-column sm:flex-row">
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar..."
                  style="width: 100%" />
              </span>
              <Button
                label="Novo"
                icon="pi pi-plus"
                class="p-button-success"
                @click="openNew" />
            </div>
          </template>
          <template #empty> Sem registros na tabela </template>
          <template #loading> Carregando... </template>
          <Column
            v-for="col of this.headers"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            headerStyle="min-width:30rem">
          </Column>
          <Column>
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

          <!-- MODAL PARA CADASTRO -->
          <Dialog
            v-model:visible="dataDialog"
            :style="{ width: '450px' }"
            :header="'Cadastro: ' + title"
            :modal="true"
            class="p-fluid"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
            <ListsModal
              :listObj="value"
              :title="title"
              :newData="newData"
              @close="closeModalSave" />
            <template #footer>
              <Button
                label="Cancelar"
                icon="pi pi-times"
                class="p-button-text p-button-danger"
                @click="hideDialog" />
            </template>
          </Dialog>

          <!-- MODAL DE ALERTA DELEÇÃO -->
          <Dialog
            v-model:visible="deleteDataDialog"
            :style="{ width: '450px' }"
            header="Alerta"
            :modal="true">
            <div class="flex align-items-center justify-content-center">
              <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem" />
              <span v-if="value"> Tem certeza que deseja deletar ? </span>
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
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import LinhagemService from '../service/LinhagemService'
import SalaService from '../service/SalaService'
import ListsModal from './Modals/ListsModal.vue'
import ActiveAndDisableService from '../service/ActiveAndDisableService'
import PedidoService from '../service/PedidoService'

export default {
  data() {
    return {
      values: null,
      value: {},
      dataDialog: false,
      deleteDataDialog: false,
      newData: false,
      headers: null,
      route: null,
      title: null,
      filters: null,
      loading: true,
      searchString: null,
      page: 1
    }
  },
  entityService: null,
  created() {
    this.route = this.$route.path
    this.title = this.$route.name
    this.initFilters()
  },
  mounted() {
    this.getMethod()
    this.loading = false
  },
  methods: {
    prev() {
      //TODO: ADICIONAR MÉTODO PARA PAG ANTERIOR
      // renderizar botão apenas se n for a primeira pag
    },
    next() {
      //TODO: ADICIONAR MÉTODO PARA PAG ANTERIOR
      // renderizar botão apenas se n for a última pag
    },
    closeModalSave() {
      this.hideDialog()
      this.getMethod()
    },
    openNew() {
      this.value = {}
      this.newData = true
      this.dataDialog = true
    },
    hideDialog() {
      this.newData = false
      this.dataDialog = false
    },
    confirmDeleteRecord(value) {
      this.value = value
      this.deleteDataDialog = true
    },
    edit(entityData) {
      this.value = { ...entityData }
      this.newData = false
      this.dataDialog = true
    },
    deleteData() {
      ActiveAndDisableService.activeAndDisable(
        this.value.id,
        false,
        (success) => {
          if (success) {
            this.values = this.values.filter((val) => val.id != this.value.id)
            this.deleteDataDialog = false
            this.value = {}
            this.$toast.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Registro deletado',
              life: 4000
            })
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro. Por favor, tente novamente mais tarde.',
              life: 4000
            })
          }
        }
      )
    },
    search() {
      //TODO: método de busca
      this.searchString = ''
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
    getMethod() {
      if (this.route == '/config/linhagem') {
        LinhagemService.getLinhagem(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = LinhagemService.getLinhagemHeaders()
      } else if (this.route == '/config/sala') {
        SalaService.getSalas(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = SalaService.getSalaHeaders()
      } else if (this.route == '/config/linhapesquisa') {
        PedidoService.getLinhaPesquisas(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getLinhaPesquisaHeaders()
      } else if (this.route == '/config/insti') {
        PedidoService.getVinculoInstitucional(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getVinculoInstitucionalHeaders()
      } else if (this.route == '/config/proj') {
        PedidoService.getProjetos(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getProjetosHeaders()
      } else if (this.route == '/config/lab') {
        PedidoService.getLaboratorios(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getLaboratoriosHeaders()
      } else if (this.route == '/config/nivelpesquisa') {
        PedidoService.getNivelProjetos(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getNivelProjetoHeaders()
      } else if (this.route == '/config/especie') {
        PedidoService.getEspecies(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getEspeciesHeaders()
      } else if (this.route == '/config/finalidade') {
        PedidoService.getFinalidades(
          (datas) => (this.values = datas),
          (error) => {
            if (error.response) {
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
        this.headers = PedidoService.getFinalidadesHeaders()
      }
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  },
  components: { ListsModal }
}
</script>
