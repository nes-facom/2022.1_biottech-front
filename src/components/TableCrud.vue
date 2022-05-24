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
          dataKey="id"
          :rows="10"
          :filters="filters"
          :lazy="true"
          showGridlines
          stripedRows
          responsiveLayout="stack"
          breakpoint="1530px">
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

          <Column
            v-for="col of this.headers"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            headerStyle="min-width:10rem;">
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
          <Column headerStyle="width:2%; min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="edit(slotProps.data)" />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger mt-2"
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
import { FilterMatchMode } from 'primevue/api'
import { useRouter } from 'vue-router'
import Pesquisador from '../service/PesquisadorService'

export default {
  data() {
    return {
      values: null,
      dataDialog: false,
      deleteDataDialog: false,
      value: {},
      filters: {},
      headers: null,
      dropdownSelected: null,
      route: null
    }
  },
  entityService: null,
  created() {
    this.route = this.$route.path
    this.getEntity()
    this.initFilters()
  },
  mounted() {
    this.getMethod()
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
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
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
    getEntity() {
      if (this.route == '/pesquisador') {
        this.entityService = new Pesquisador()
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
    getMethod() {
      if (this.route == '/pesquisador') {
        this.entityService.getPesquisador().then((data) => (this.values = data))
        this.headers = this.entityService.getPesquisadorHeaders()
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
    }
  }
}
</script>
