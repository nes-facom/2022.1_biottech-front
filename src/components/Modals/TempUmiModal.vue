<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="sala">Sala Número</label>
        <Dropdown
          id="sala"
          v-model="tempumi.sala"
          :options="salas"
          optionLabel="num_sala"
          :filter="true"
          placeholder="Selecione uma Sala"
          :disabled="disabled"
          :showClear="true"
          emptyFilterMessage="Nenhuma opção corresponde a busca"
          emptyMessage="Nenhuma opção disponível"
          :class="{ 'p-invalid': required && !tempumi.sala }">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.num_sala }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.num_sala }}</div>
          </template>
        </Dropdown>
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !tempumi.sala">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label for="data">Data</label>
        <Calendar
          id="data"
          v-model="tempumi.data"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !tempumi.data }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !tempumi.data">
          Campo Obrigatório
        </small>
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
import SalaService from '../../service/SalaService'
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
  mounted() {
    SalaService.getSalas((datas) => (this.salas = datas))
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
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.saveButtonDisabled = false
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
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
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.saveButtonDisabled = false
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
      if (this.tempumi.data && this.tempumi.sala.num_sala) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
