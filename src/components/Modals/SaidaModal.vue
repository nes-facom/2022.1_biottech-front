<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="caixa">Caixa</label>
        <InputText
          id="model"
          type="text"
          v-model="saida.caixa.caixa_numero"
          :class="{ 'p-invalid': required && !saida.caixa.caixa_numero }" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="data_saida">Data da saída</label>
        <Calendar
          id="data_saida"
          v-model="saida.data_saida"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !saida.data_saida }" />
        <small class="p-invalid" v-if="required && !saida.data_saida">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="usuario">Usuário</label>
        <InputText v-model="saida.usuario" id="usuario" type="text" required />
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_animais">N°de Animais</label>
        <InputNumber
          v-model="saida.num_animais"
          id="num_animais"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !saida.num_animais }" />
        <small class="p-invalid" v-if="required && !saida.num_animais">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="sobra">Sobra</label>
        <InputNumber
          v-model="saida.sobra"
          id="sobra"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !saida.sobra }" />
        <small class="p-invalid" v-if="required && !saida.sobra">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label class="mb-3">Saída</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="ultima"
              name="saida"
              value="ultima"
              v-model="saida.saida"
              :class="{ 'p-invalid': required && !saida.saida }" />
            <label for="femea">Última</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="macho"
              name="saida"
              value="sobra"
              v-model="saida.saida"
              :class="{ 'p-invalid': required && !saida.saida }" />
            <label for="macho">Sobra</label>
          </div>
        </div>
      </div>
      <div class="field col-12">
        <label for="tipo_saida">Tipo da saída</label>
        <Dropdown
          id="tipo_saida"
          v-model="saida.tipo_saida"
          :options="types"
          placeholder="Selecione um tipo"
          :class="{ 'p-invalid': required && !saida.tipo_saida }">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option }}</div>
          </template>
        </Dropdown>
      </div>
      <div class="field col-12">
        <label for="previsao_id">Previsão</label>
        <InputText
          id="previsao"
          ref="previsaoInput"
          type="text"
          v-model="saida.previsao.num_previsao"
          :disabled="saida.tipo_saida !== 'fornecimento'"
          :placeholder="
            saida.tipo_saida !== 'fornecimento'
              ? 'Previsões são apenas do tipo \'fornecimento\' '
              : 'Selecione uma previsão'
          " />
      </div>
      <div class="field col-12">
        <label class="mb-3">Sexo</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="femea"
              name="sexo"
              value="femea"
              v-model="saida.sexo"
              :class="{ 'p-invalid': required && !saida.sexo }" />
            <label for="femea">Fêmea</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="macho"
              name="sexo"
              value="macho"
              v-model="saida.sexo"
              :class="{ 'p-invalid': required && !saida.sexo }" />
            <label for="macho">Macho</label>
          </div>
        </div>
      </div>
      <div class="field col-12">
        <label for="observacoes">Observações</label>
        <Textarea
          id="observacoes"
          type="text"
          v-model="saida.observacoes"
          :autoResize="true"
          rows="1" />
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
import SaidaService from '../../service/SaidaService'

export default {
  data() {
    return {
      types: [
        'fornecimento',
        'acasalamento',
        'eutanasia',
        'obito',
        'controle_sanitário'
      ],
      caixas: null,
      previsoes: null,
      required: false
    }
  },
  props: {
    saida: Object,
    newData: Boolean
  },
  created() {
    if (!this.saida.caixa) {
      this.saida.caixa = {}
      this.saida.caixa.caixa_numero = null
    }

    if (!this.saida.previsao) {
      this.saida.previsao = {}
      this.saida.previsao.num_previsao = null
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
      if (this.newData && checked_fields) {
        SaidaService.saveSaida(
          this.saida,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Saída cadastrada com sucesso'
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
        SaidaService.editSaida(
          this.saida,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Saída editada com sucesso'
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
      if (
        this.saida.data_saida &&
        this.saida.tipo_saida &&
        this.saida.num_animais &&
        this.saida.saida &&
        this.saida.sexo &&
        this.saida.sobra &&
        this.saida.caixa.caixa_numero
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
