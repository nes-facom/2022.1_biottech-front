<!-- WIP -->
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5 v-if="this.config">{{ this.title }}</h5>
        <DataTable
          ref="dt"
          :rowHover="true"
          :value="values"
          dataKey="id"
          :rows="10"
          :loading="loading"
          stripedRows
          responsiveLayout="stack"
          breakpoint="1000px"
          resizableColumns
          filterDisplay="menu"
          class="p-datatable-gridlines">
          <template #header>
            <div
              class="flex flex-column justify-content-between md:flex-row md:align-items-center">
              <h5>{{ this.title }}</h5>
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
            headerStyle="min-width:50rem">
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'

export default {
  data() {
    return {
      values: null,
      value: {},
      headers: null,
      route: null,
      title: null,
      filters: null,
      loading: true,
      config: false,
      searchString: null
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
    this.loading = false
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
    confirmDeleteRecord(value) {
      this.value = value
      this.deleteDataDialog = true
    },
    edit(entityData) {
      this.value = { ...entityData }
      this.dataDialog = true
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
    getEntity() {
      if (this.route == '/pesquisador/desativado') {
      } else if (this.route == '/pedido/desativado') {
      } else if (this.route == '/previsao/desativado') {
      } else if (this.route == '/saida/desativado') {
      } else if (this.route == '/caixa/desativado') {
      } else if (this.route == '/tempumi/desativado') {
      } else if (this.route == '/cxmatriz/desativado') {
      } else if (this.route == '/parto/desativado') {
      }
    },
    getMethod() {
      if (this.route == '/pesquisador/desativado') {
      } else if (this.route == '/pedido/desativado') {
      } else if (this.route == '/previsao/desativado') {
      } else if (this.route == '/saida/desativado') {
      } else if (this.route == '/caixa/desativado') {
      } else if (this.route == '/tempumi/desativado') {
      } else if (this.route == '/cxmatriz/desativado') {
      } else if (this.route == '/parto/desativado') {
      }
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
