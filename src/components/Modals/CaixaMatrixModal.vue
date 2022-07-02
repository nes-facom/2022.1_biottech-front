<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="caixa_matriz_numero">N° Caixa Matriz</label>
        <InputText
          id="caixa_matriz_numero"
          v-model="caixa_matriz.caixa_matriz_numero"
          :class="{
            'p-invalid': required && !caixa_matriz.caixa_matriz_numero
          }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa_matriz.caixa_matriz_numero">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label for="data_acasalamento">Data Acasalamento</label>
        <Calendar
          id="data_acasalamento"
          v-model="caixa_matriz.data_acasalamento"
          dateFormat="yy-mm-dd"
          :class="{
            'p-invalid': required && !caixa_matriz.data_acasalamento
          }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa_matriz.data_acasalamento">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="saida_da_colonia">Saída da Colônia</label>
        <Calendar
          id="saida_da_colonia"
          v-model="caixa_matriz.saida_da_colonia"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="data_obito">Data Óbito</label>
        <Calendar
          id="data_obito"
          v-model="caixa_matriz.data_obito"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="col-12 mb-4">
        <Divider align="center">
          <p>Caixas de Origem</p>
        </Divider>
      </div>
      <div
        v-if="!caixa_matriz.id"
        class="col-12 grid flex justify-content-center">
        <div
          v-for="caixa in caixasOrigem"
          :key="caixa.caixa_numero"
          class="field col-12 grid">
          <div class="field col-6">
            <span class="p-float-label">
              <InputText id="caixa_numero" v-model="caixa.caixa_numero" />
              <label for="caixa_numero"> N° Caixa </label>
            </span>
          </div>
          <div class="field col-6">
            <span class="p-float-label">
              <InputNumber
                id="caixa_peso"
                mode="decimal"
                :maxFractionDigits="2"
                :useGrouping="false"
                v-model="caixa.peso" />
              <label for="caixa_peso"> Peso </label>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="col-12 grid flex justify-content-center">
        <div
          v-for="caixa in caixasOrigem"
          :key="caixa.caixa_numero"
          class="field col-12 grid">
          <div class="field col-6">
            <span class="p-float-label">
              <InputText id="caixa_numero" v-model="caixa.caixa_numero" />
              <label for="caixa_numero"> N° Caixa </label>
            </span>
          </div>
          <div class="field col-4">
            <span class="p-float-label">
              <InputNumber
                id="caixa_peso"
                mode="decimal"
                :maxFractionDigits="2"
                :useGrouping="false"
                v-model="caixa.peso" />
              <label for="caixa_peso"> Peso </label>
            </span>
          </div>
          <div class="field col-2">
            <Button
              @click="delCaixa(caixa)"
              icon="pi pi-times"
              class="p-button-danger mt-2" />
          </div>
        </div>
      </div>
      <div class="field col-12 grid">
        <div class="field col-6">
          <span class="p-float-label">
            <InputText
              id="caixa_numero"
              v-model="newCaixaOrigem.caixa_numero" />
            <label for="caixa_numero"> N° Caixa </label>
          </span>
        </div>
        <div class="field col-6">
          <div class="p-inputgroup">
            <span class="p-float-label">
              <InputNumber
                id="caixa_peso"
                mode="decimal"
                :maxFractionDigits="2"
                :useGrouping="false"
                v-model="newCaixaOrigem.peso" />
              <label for="caixa_peso"> Peso </label>
            </span>
            <Button
              icon="pi pi-plus"
              class="p-button-success"
              @click="addCaixaOrigem" />
          </div>
        </div>
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
import CaixaMatrizService from '../../service/CaixaMatrizService'

export default {
  data() {
    return {
      caixas: null,
      required: false,
      newCaixaOrigem: {},
      caixasOrigem: []
    }
  },
  props: {
    caixa_matriz: Object
  },
  mounted() {
    if (this.caixa_matriz.id) {
      this.caixasOrigem = []
      if (
        typeof this.caixa_matriz.caixa !== 'undefined' &&
        this.caixa_matriz.caixa.length > 0
      ) {
        var caixaEdit = {}
        this.caixa_matriz.caixa.forEach((element) => {
          caixaEdit.caixa_numero = element.caixa_numero
          caixaEdit.peso = element._joinData.peso

          this.caixasOrigem.push(caixaEdit)
        })
      }
    }
  },
  methods: {
    showToast(severity, summary, detail, close) {
      if (close && typeof close !== 'undefined') {
        this.$emit('close', false)
      }

      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000
      })
    },
    save() {
      this.required = true
      const checked_fields = this.checkRequired()
      if (!this.caixa_matriz.id && checked_fields) {
        CaixaMatrizService.saveCaixaMatriz(
          this.caixa_matriz,
          this.caixasOrigem,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Caixa Matriz cadastrada com sucesso',
              true
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
      } else if (this.caixa_matriz.id && checked_fields) {
        CaixaMatrizService.editCaixaMatriz(
          this.caixa_matriz,
          this.caixasOrigem,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Caixa Matriz editada com sucesso',
              true
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
        this.caixa_matriz.caixa_matriz_numero &&
        this.caixa_matriz.data_acasalamento
      ) {
        return true
      } else {
        return false
      }
    },
    addCaixaOrigem() {
      if (Object.keys(this.newCaixaOrigem).length < 2) {
        this.showToast(
          'warn',
          'Insira valores válidos',
          'Número da Caixa e/ou Peso vazios',
          false
        )
        return
      }

      this.caixasOrigem.push({
        caixa_numero: this.newCaixaOrigem.caixa_numero,
        peso: this.newCaixaOrigem.peso
      })
      this.newCaixaOrigem = {}
    },
    delCaixa(item) {
      const index = this.caixasOrigem.indexOf(item)
      if (index > -1) {
        this.caixasOrigem.splice(index, 1)
      }
    }
  }
}
</script>
