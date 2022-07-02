<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="caixa_matriz">Caixa Matriz</label>
        <InputText
          id="caixa_matriz"
          type="text"
          v-model="caixa.caixa_matriz.caixa_matriz_numero" />
      </div>
      <div class="field col-12">
        <label for="linhagem">Linhagem</label>
        <Dropdown
          id="linhagem"
          v-model="caixa.linhagem"
          :options="linhagens"
          optionLabel="Linhagem"
          :filter="true"
          placeholder="Selecione uma linhagem"
          :class="{ 'p-invalid': required && !caixa.linhagem }">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.nome_linhagem }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>{{ slotProps.option.nome_linhagem }}</div>
          </template>
        </Dropdown>
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa.linhagem">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="caixa_numero">N° da Caixa</label>
        <InputText
          v-model="caixa.caixa_numero"
          id="caixa_numero"
          type="text"
          :class="{ 'p-invalid': required && !caixa.caixa_numero }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa.caixa_numero">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="nascimento">Data de Nascimento</label>
        <Calendar
          id="nascimento"
          v-model="caixa.nascimento"
          dateFormat="yy-mm-dd"
          :class="{ 'p-invalid': required && !caixa.nascimento }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa.nascimento">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12">
        <label class="mb-3">Sexo</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="femea"
              name="sexo"
              value="femea"
              v-model="caixa.sexo"
              :class="{ 'p-invalid': required && !caixa.sexo }" />
            <label for="femea">Fêmea</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="macho"
              name="sexo"
              value="macho"
              v-model="caixa.sexo"
              :class="{ 'p-invalid': required && !caixa.sexo }" />
            <label for="macho">Macho</label>
          </div>
        </div>
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa.sexo">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="num_animais">N° de Animais</label>
        <InputNumber
          autocomplete="off"
          v-model="caixa.num_animais"
          id="num_animais"
          :useGrouping="false"
          :class="{ 'p-invalid': required && !caixa.num_animais }" />
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !caixa.num_animais">
          Campo Obrigatório
        </small>
      </div>
      <div class="field col-12 md:col-6">
        <label for="ultima_saida">Última Saída</label>
        <Calendar
          id="ultima_saida"
          v-model="caixa.ultima_saida"
          dateFormat="yy-mm-dd" />
      </div>
      <div class="field col-12">
        <label for="qtd_saida">Quantidade de animais retirados</label>
        <InputNumber
          autocomplete="off"
          v-model="caixa.qtd_saida"
          id="qtd_saida"
          :useGrouping="false" />
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
import CaixaService from '../../service/CaixaService'
import LinhagemService from '../../service/LinhagemService'
import PedidoService from '../../service/PedidoService'

export default {
  data() {
    return {
      caixas_matriz: null,
      linhagens: null,
      required: false
    }
  },
  props: {
    caixa: Object,
    newData: Boolean
  },
  mounted() {
    PedidoService.getLinhagens((datas) => (this.linhagens = datas))
  },
  created() {
    if (!this.caixa.caixa_matriz) {
      this.caixa.caixa_matriz = {}
      this.caixa.caixa_matriz.caixa_matriz_numero = null
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
      if (!this.caixa.id && checked_fields) {
        CaixaService.saveCaixa(
          this.caixa,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'Caixa cadastrada com sucesso'
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
      } else if (this.caixa.id && checked_fields) {
        CaixaService.editCaixa(
          this.caixa,
          () =>
            this.showToast(
              'success',
              'Editado com Sucesso',
              'Caixa editada com sucesso'
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
        this.caixa.caixa_numero &&
        this.caixa.nascimento &&
        this.caixa.sexo &&
        this.caixa.num_animais &&
        this.caixa.linhagem
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
