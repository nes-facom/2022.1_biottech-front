<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="caixa_matriz">Caixa Matriz</label>
        <InputText
          id="caixa_matriz"
          type="text"
          v-model="parto.caixa_matriz.caixa_matriz_numero"
          :class="{
            'p-invalid': required && !parto.caixa_matriz.caixa_matriz_numero
          }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="numero_parto">N° Parto</label>
        <InputNumber
          id="numero_parto"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.numero_parto"
          :class="{ 'p-invalid': required && !parto.numero_parto }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="data_parto">Data Parto</label>
        <Calendar
          id="data_parto"
          v-model="parto.data_parto"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !parto.data_parto }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_macho">N° Macho</label>
        <InputNumber
          id="num_macho"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.num_macho"
          v-tooltip.top.focus="'Número de machos nascidos'" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_femea">N° Fêmea</label>
        <InputNumber
          id="num_femea"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.num_femea"
          v-tooltip.top.focus="'Número de fêmeas nascidas'" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="des_macho">N° Machos Desmamados</label>
        <InputNumber
          id="des_macho"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.des_macho" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="des_femea">N° Fêmea Desmamadas</label>
        <InputNumber
          id="des_femea"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.des_femea" />
      </div>
      <div class="field col-12">
        <Divider align="center">
          <b>Óbitos</b>
        </Divider>
      </div>
      <div class="field col-12 md:col-4">
        <label for="qtd_canib">Canibalizados</label>
        <InputNumber
          id="qtd_canib"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.qtd_canib" />
      </div>
      <div class="field col-12 md:col-4">
        <label for="qtd_gamba">Gambás</label>
        <InputNumber
          id="qtd_gamba"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.qtd_gamba" />
      </div>
      <div class="field col-12 md:col-4">
        <label for="qtd_outros">Outros</label>
        <InputNumber
          id="qtd_outros"
          mode="decimal"
          :useGrouping="false"
          v-model="parto.qtd_outros" />
      </div>
      <div class="col-12">
        <Button
          label="Salvar"
          icon="pi pi-check"
          class="p-button-success"
          @click="save" />
      </div>
    </div>
  </div>
</template>

<script>
import PartoService from '../../service/PartoService'

export default {
  data() {
    return {
      caixas_matriz: null,
      required: false
    }
  },
  props: {
    parto: Object,
    newData: Boolean
  },
  mounted() {
    // TODO: trazes as caixas_matriz possíveis a serem selecionadas
  },
  created() {
    if (!this.parto.caixa_matriz) {
      this.parto.caixa_matriz = {}
      this.parto.caixa_matriz.caixa_matriz_numero = null
    }
  },
  methods: {
    showToast(severity, summary, detail) {
      this.$emit('close', false)
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 4000
      })
    },
    save() {
      this.required = true
      const checked_fields = this.checkRequired()
      if (!this.parto.id && checked_fields) {
        PartoService.saveParto(
          this.parto,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Parto cadastrado com sucesso'
            ),
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
      } else if (this.parto.id && checked_fields) {
        PartoService.editParto(
          this.parto,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Parto Editado com sucesso'
            ),
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
      }
    },
    checkRequired() {
      if (
        this.parto.numero_parto &&
        this.parto.data_parto &&
        this.parto.caixa_matriz.caixa_matriz_numero
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
