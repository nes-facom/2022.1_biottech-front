<!-- WIP -->
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Filter Menu</h5>
        <DataTable
          :value="customer1"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters"
          responsiveLayout="scroll">
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  style="width: 100%" />
              </span>
            </div>
          </template>
          <template #empty> Sem registros na tabela </template>
          <template #loading> Carregando... </template>
          <Column field="name" header="Name" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column
            header="Country"
            filterField="country.name"
            style="min-width: 12rem">
            <template #body="{ data }">
              <span
                style="margin-left: 0.5em; vertical-align: middle"
                class="image-text"
                >{{ data.country.name }}</span
              >
            </template>
          </Column>

          <Column
            header="Date"
            filterField="date"
            dataType="date"
            style="min-width: 10rem">
            <template #body="{ data }">
              {{ formatDate(data.date) }}
            </template>
          </Column>
          <Column
            header="Balance"
            filterField="balance"
            dataType="numeric"
            style="min-width: 10rem">
            <template #body="{ data }">
              {{ formatCurrency(data.balance) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import CustomerService from '../service/CustomerService'
import ProductService from '../service/ProductService'
export default {
  data() {
    return {
      customer1: null,
      filters: null,
      loading1: true,
      products: null
    }
  },
  customerService: null,
  productService: null,
  created() {
    this.customerService = new CustomerService()
    this.productService = new ProductService()
    this.initFilters()
  },
  mounted() {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data) => (this.products = data))
    this.customerService.getCustomersLarge().then((data) => {
      this.customer1 = data
      this.loading1 = false
      this.customer1.forEach(
        (customer) => (customer.date = new Date(customer.date))
      )
    })
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
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
