<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="New"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew" />
              <Button
                label="Delete"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="confirmDeleteSelected"
                :disabled="!selected || !selected.length" />
            </div>
          </template>

          <template v-slot:end>
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)" />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="values"
          v-model:selection="selected"
          dataKey="id"
          :rows="10"
          :filters="filters"
          :lazy="true"
          showGridlines
          stripedRows
          responsiveLayout="stack"
          breakpoint="960px">
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 class="m-0">TITULO</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  placeholder="Buscar..."
                  v-model="filters['global'].value" />
              </span>
            </div>
          </template>
          <template #empty> Sem registros na tabela </template>
          <template #loading> Carregando... </template>

          <!-- WIP: bug está selecionando todos sempre -->
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

          <Column
            v-for="col of this.headers"
            :key="col.field"
            :field="col.field"
            :header="col.header">
            <template #body="slotProps" v-if="col.field === 'telefone'">
              <!-- WIP -->
              <!-- <Dropdown
                v-model="dropdownSelected"
                :options="getArray(slotProps.data.telefones)"></Dropdown> -->
              <Textarea
                v-model="slotProps.data.telefones"
                :autoResize="true"
                rows="2"
                cols="15"
                disabled />
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="edit(slotProps.data)" />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="confirmDeleteRecord(slotProps.data)" />
            </template>
          </Column>

          <!-- WIP -->
          <!-- MODAL PARA CADASTRO -->
          <Dialog
            v-model:visible="dataDialog"
            :style="{ width: '450px' }"
            header="Product Details"
            :modal="true"
            class="p-fluid">
            <p>TODO: ADD FORM</p>
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

          <!-- WIP -->
          <!-- MODAL DE ALERTA DELEÇÃO SINGULAR -->
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

          <!-- WIP -->
          <!-- MODAL DE ALERTA DELEÇÃO MÚLTIPLA -->
          <Dialog
            v-model:visible="deleteSelectedDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true">
            <div class="flex align-items-center justify-content-center">
              <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem" />
              <span v-if="value"
                >Tem certeza que deseja deletar todos os registros
                selecionados?</span
              >
            </div>
            <template #footer>
              <Button
                label="No"
                icon="pi pi-times"
                class="p-button-text"
                @click="deleteSelectedDialog = false" />
              <Button
                label="Yes"
                icon="pi pi-check"
                class="p-button-text"
                @click="deleteSelected" />
            </template>
          </Dialog>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import Pesquisador from '../service/PesquisadorService'

export default {
  data() {
    return {
      values: null,
      dataDialog: false,
      deleteDataDialog: false,
      deleteSelectedDialog: false,
      value: {},
      selected: null,
      filters: {},
      headers: null,
      dropdownSelected: null
    }
  },
  entityService: null,
  created() {
    this.entityService = new Pesquisador()
    this.initFilters()
  },
  mounted() {
    this.entityService.getPesquisador().then((data) => (this.values = data))
    this.headers = this.entityService.getPesquisadorHeaders()
  },
  methods: {
    openNew() {
      this.value = {}
      // this.submitted = false
      this.dataDialog = true
    },
    hideDialog() {
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
    confirmDeleteSelected() {
      this.deleteSelectedDialog = true
    },
    deleteSelected() {
      this.values = this.values.filter((val) => !this.selected.includes(val))
      this.deleteSelectedDialog = false
      this.selected = null
      this.$toast.add({
        severity: 'Sucesso',
        summary: 'Sucesso',
        detail: 'Registros deletados',
        life: 3000
      })
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    },
    getArray(obj) {
      const arr = Object.keys(obj).map(function (key) {
        return obj[key]
      })
      return arr
    }
  }
}
</script>
