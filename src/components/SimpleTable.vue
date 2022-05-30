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
              v-if="this.config"
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
            <div
              v-else
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
            <ListsModal :listObj="value" />
            <template #footer>
              <Button
                label="Cancelar"
                icon="pi pi-times"
                class="p-button-text"
                @click="hideDialog" />
              <Button
                label="Salvar"
                icon="pi pi-check"
                class="p-button-text"
                @click="saveNew" />
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
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import Linhagem from '../service/LinhagemService'
import ListsModal from './Modals/ListsModal.vue'

export default {
  data() {
    return {
      values: null,
      value: {},
      dataDialog: false,
      deleteDataDialog: false,
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
      if (this.route == '/config/linhagem') {
        this.entityService = new Linhagem()
        this.title = 'Linhagem'
        this.config = true
      } else if (this.route == '/config/sala') {
        ;('Sala')
        this.title = 'Sala'
        this.config = true
      } else if (this.route == '/config/linhapesquisa') {
        ;('Linha Pesquisa')
        this.title = 'Linha de Pesquisa'
        this.config = true
      } else if (this.route == '/config/insti') {
        ;('Instituição')
        this.title = 'Vínculo Institucional'
        this.config = true
      } else if (this.route == '/config/proj') {
        ;('Projeto')
        this.title = 'Nível de Projeto'
        this.config = true
      } else if (this.route == '/config/lab') {
        ;('Laboratório')
        this.title = 'Laboratório'
        this.config = true
      } else if (this.route == '/config/especie') {
        ;('Espécie')
        this.title = 'Espécie'
        this.config = true
      } else if (this.route == '/config/finalidade') {
        ;('Finalidade')
        this.title = 'Finalidade'
        this.config = true
      } else if (this.route == '/exp/pedido') {
        ;('exp/pedido')
        this.title = 'Pedido'
      } else if (this.route == '/exp/pesquisadores') {
        ;('Pesquisadores')
        this.title = 'Pesquisadores'
      } else if (this.route == '/exp/previsao') {
        ;('Previsao')
        this.title = 'Previsão'
      } else if (this.route == '/exp/resultado') {
        ;('resultado')
        this.title = 'Resultado'
      } else if (this.route == '/criacao/dados') {
        ;('Entrada dados')
        this.title = 'Entrada Dados'
      } else if (this.route == '/criacao/saidas') {
        ;('Saidas')
        this.title = 'Saídas'
      } else if (this.route == '/criacao/tempumi') {
        ;('Temperatura Umidade')
        this.title = 'Temperatura & Umidade'
      } else if (this.route == '/repro/nascdesma') {
        ;('Nascimento e Desmame')
        this.title = 'Nascimento e Desmame'
      } else if (this.route == '/repro/matrizes') {
        ;('Matrizes')
        this.title = 'Matrizes'
      } else if (this.route == '/repro/progacasal') {
        ;('Programação e acasalamento')
        this.title = 'Programação e acasalamento'
      } else if (this.route == '/repro/controlerepro') {
        ;('Controle Reprodutivo')
        this.title = 'Controle Reprodutivo'
      }
    },
    getMethod() {
      if (this.route == '/config/linhagem') {
        this.entityService.getLinhagem().then((data) => (this.values = data))
        this.headers = this.entityService.getLinhagemHeaders()
      } else if (this.route == '/config/sala') {
      } else if (this.route == '/config/linhapesquisa') {
      } else if (this.route == '/config/insti') {
      } else if (this.route == '/config/proj') {
      } else if (this.route == '/config/lab') {
      } else if (this.route == '/config/especie') {
      } else if (this.route == '/config/finalidade') {
      } else if (this.route == '/exp/pedido') {
      } else if (this.route == '/exp/pesquisadores') {
      } else if (this.route == '/exp/previsao') {
      } else if (this.route == '/exp/resultado') {
      } else if (this.route == '/criacao/dados') {
      } else if (this.route == '/criacao/saidas') {
      } else if (this.route == '/criacao/tempumi') {
      } else if (this.route == '/repro/nascdesma') {
      } else if (this.route == '/repro/matrizes') {
      } else if (this.route == '/repro/progacasal') {
      } else if (this.route == '/repro/controlerepro') {
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
