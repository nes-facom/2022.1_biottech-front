<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="num_previsao">N° Previsão</label>
        <InputText
          v-model="previsao.num_previsao"
          id="num_previsao"
          type="text"
          autofocus
          :class="{ 'p-invalid': required && !previsao.num_previsao }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !previsao.num_previsao">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="retirada_num">N° Retirada</label>
        <InputNumber
          autocomplete="off"
          v-model="previsao.retirada_num"
          id="retirada_num"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !previsao.retirada_num }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !previsao.retirada_num">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="qtd_retirar">Quantidade a retirar</label>
        <InputNumber
          v-model="previsao.qtd_retirar"
          id="qtd_retirar"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !previsao.qtd_retirar }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !previsao.qtd_retirar">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="retirada_data">Data da retirada</label>
        <Calendar
          id="retirada_data"
          v-model="previsao.retirada_data"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !previsao.retirada_data }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !previsao.retirada_data">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label for="status">Status</label>
        <Dropdown
          id="status"
          v-model="previsao.status"
          :options="statuses"
          placeholder="Selecione um status"
          :class="{ 'p-invalid': required && !previsao.status }">
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
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !previsao.status">
          Campo Obrigatório
        </small>
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
import PrevisaoService from '../../service/PrevisaoService'

export default {
  data() {
    return {
      statuses: ['aberto', 'fechado'],
      required: false
    }
  },
  props: {
    previsao: Object,
    newData: Boolean
  },
  mounted() {
    // TODO: Recuperar pedidos possíveis a serem selecionados para uma previsão
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
    successfullySaved() {
      this.$router.push('/previsao')
      this.showToast(
        'success',
        'Cadastrado com Sucesso',
        'Pedido cadastrado com sucesso'
      )
    },
    save() {
      this.required = true
      const checked_fields = this.checkRequired()
      if (!this.previsao.id && checked_fields) {
        PrevisaoService.savePrevisao(
          this.previsao,
          () => this.successfullySaved(),
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
        PrevisaoService.editPrevisao(
          this.previsao,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Previsão editada com sucesso'
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
      if (
        this.previsao.num_previsao &&
        this.previsao.retirada_num &&
        this.previsao.qtd_retirar &&
        this.previsao.status &&
        this.previsao.retirada_data
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
