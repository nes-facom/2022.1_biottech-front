<!-- WIP -->
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
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
            <ListsModal :listObj="value" :title="title" :newData="newData" />
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
import ListsModal from './Modals/ListsModal.vue'
import ActiveAndDisableService from '../service/ActiveAndDisableService'

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
      loading: true
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
              life: 3000
            })
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro. Por favor, tente novamente mais tarde.',
              life: 3000
            })
          }
        }
      )
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
              console.log(error.response)
            } else {
              console.log(error)
            }
          }
        )
        this.headers = LinhagemService.getLinhagemHeaders()
      } else if (this.route == '/config/sala') {
      } else if (this.route == '/config/linhapesquisa') {
      } else if (this.route == '/config/insti') {
      } else if (this.route == '/config/proj') {
      } else if (this.route == '/config/lab') {
      } else if (this.route == '/config/especie') {
      } else if (this.route == '/config/finalidade') {
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
