<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="sala">Sala Número</label>
        <InputText
          id="sala"
          type="text"
          v-model="tempumi.sala.num_sala"
          :class="{ 'p-invalid': required && !tempumi.sala.num_sala }" />
      </div>
      <div class="field col-12">
        <label for="data">Data</label>
        <Calendar
          id="data"
          v-model="tempumi.data"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !tempumi.data }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="temp_matutino">Temp. Matutino</label>
        <InputNumber
          id="temp_matutino"
          mode="decimal"
          :maxFractionDigits="2"
          :useGrouping="false"
          v-model="tempumi.temp_matutino" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="ur_matutino">U.R. Matutino</label>
        <InputText
          id="ur_matutino"
          v-model="tempumi.ur_matutino"
          v-tooltip.top="'Em %'" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="temp_vespertino">Temp. Vespertino</label>
        <InputNumber
          id="temp_vespertino"
          mode="decimal"
          :maxFractionDigits="2"
          :useGrouping="false"
          v-model="tempumi.temp_vespertino" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="ur_vespertino">U.R. Vespertino</label>
        <InputText
          id="ur_vespertino"
          v-model="tempumi.ur_vespertino"
          v-tooltip.top="'Em %'" />
      </div>
      <div class="field col-12">
        <label for="observacoes">Observações</label>
        <Textarea
          id="observacoes"
          type="text"
          v-model="tempumi.observacoes"
          :autoResize="true"
          rows="2" />
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
import TemperaturaUmidadeService from '../../service/TemperaturaUmidadeService'

export default {
  data() {
    return {
      salas: null,
      required: false
    }
  },
  props: {
    tempumi: Object,
    newData: Boolean
  },
  created() {
    if (!this.tempumi.sala) {
      this.tempumi.sala = {}
      this.tempumi.sala.num_sala = null
    }
  },
  methods: {
    showToast(severity, summary, detail) {
      this.$emit('close', false)
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
      console.log
      if (this.newData && checked_fields) {
        TemperaturaUmidadeService.saveTemperaturaUmidade(
          this.tempumi,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Temperatura Umidade cadastrada com sucesso'
            ),
          (error) => {
            if (error.response) {
              this.saveButtonDisabled = false
              console.log(error.response)
            } else {
              this.saveButtonDisabled = false
              console.log(error)
            }
          }
        )
      } else if (checked_fields) {
        TemperaturaUmidadeService.editTemperaturaUmidade(
          this.tempumi,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Temperatura Umidade editada com sucesso'
            ),
          (error) => {
            if (error.response) {
              this.saveButtonDisabled = false
              console.log(error.response)
            } else {
              this.saveButtonDisabled = false
              console.log(error)
            }
          }
        )
      }
    },
    checkRequired() {
      if (this.tempumi.data && this.tempumi.sala.num_sala) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
