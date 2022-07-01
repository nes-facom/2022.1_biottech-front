<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="nome">{{ label }}</label>
        <InputText
          v-model="value"
          id="nome"
          type="text"
          :class="{ 'p-invalid': required && !value }" />
        <small style="color: red" class="p-invalid" v-if="required && !value">
          Campo Obrigatório
        </small>
      </div>
      <div v-if="title == 'Sala'" class="field col-12">
        <label for="nome">Linhagens</label>
        <MultiSelect
          v-model="listObj.linhagens"
          :options="linhagens"
          optionLabel="linhagens"
          placeholder="Selecione as linhagens"
          display="chip"
          emptyMessage="Nenhuma opção disponível"
          :class="{ 'p-invalid': required && !listObj.linhagens }">
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
        </MultiSelect>
        <small
          style="color: red"
          class="p-invalid"
          v-if="required && !listObj.linhagens">
          Campo Obrigatório
        </small>
      </div>
      <div class="col-12">
        <Button
          :disabled="disabled"
          label="Salvar"
          icon="pi pi-check"
          class="p-button-success"
          @click="save" />
      </div>
    </div>
  </div>
</template>

<script>
import LinhagemService from '../../service/LinhagemService'
import SaveConfigService from '../../service/SaveConfigService'

export default {
  data() {
    return {
      linhagens: null,
      label: 'Nome',
      value: null,
      required: false,
      disabled: false
    }
  },
  props: {
    listObj: Object,
    title: String,
    newData: Boolean
  },
  mounted() {
    this.getNome()
    if (this.title == 'Sala') {
      this.label = 'Número da Sala'

      LinhagemService.getLinhagem(
        (datas) => (this.linhagens = datas),
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
      //TODO: recuperar as linhagens possíveis
      //de serem selecionadas se a lista sendo editada/cadastrada for 'Sala'
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
    getNome() {
      if (this.title == 'Linhagem') {
        this.value = this.listObj.nome_linhagem
      } else if (this.title == 'Sala') {
        this.value = this.listObj.num_sala
      } else if (this.title == 'Linha de Pesquisa') {
        this.value = this.listObj.nome_linha_pesquisa
      } else if (this.title == 'Vínculo Institucional') {
        this.value = this.listObj.nome_vinculo_institucional
      } else if (this.title == 'Projeto') {
        this.value = this.listObj.nome_projeto
      } else if (this.title == 'Laboratório') {
        this.value = this.listObj.nome_laboratorio
      } else if (this.title == 'Nível de Pesquisa') {
        this.value = this.listObj.nome_nivel_projeto
      } else if (this.title == 'Espécie') {
        this.value = this.listObj.nome_especie
      } else if (this.title == 'Finalidade') {
        this.value = this.listObj.nome_finalidade
      }
    },
    save() {
      this.disabled = true
      this.required = true
      const checked_fields = this.checkRequired()
      if (this.newData && checked_fields) {
        if (this.title == 'Sala') {
          var salaNum = this.value
          var linhagens = []
          this.value = {}
          this.value.num_sala = salaNum
          this.listObj.linhagens.forEach((element) => {
            linhagens.push(element.id)
          })
          this.value.linhagens = linhagens
        }

        SaveConfigService.save(
          this.value,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'cadastrado com sucesso'
            ),
          (error) => {
            if (error.response) {
              this.disabled = false
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.disabled = false
              this.showToast(
                'error',
                'Tivemos um Problema',
                'Tente novamente mais tarde.'
              )
            }
          }
        )
      } else if (checked_fields) {
        if (this.title == 'Sala') {
          var salaNum = this.value
          var linhagens = []
          this.value = {}
          this.value.num_sala = salaNum
          this.listObj.linhagens.forEach((element) => {
            linhagens.push(element.id)
          })
          this.value.linhagens = linhagens
        }
        this.listObj.name = this.value

        SaveConfigService.edit(
          this.listObj,
          () =>
            this.showToast(
              'success',
              'Cadastrado com Sucesso',
              'cadastrado com sucesso'
            ),
          (error) => {
            if (error.response) {
              this.disabled = false
              this.showToast(
                'error',
                'Tivemos um Problema',
                error.response.data.message
              )
            } else {
              this.disabled = false
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
      if (this.title == 'Sala') {
        if (this.value && this.listObj.linhagens) {
          return true
        } else {
          this.disabled = false
          return false
        }
      } else {
        if (this.value) {
          return true
        } else {
          this.disabled = false
          return false
        }
      }
    }
  }
}
</script>
