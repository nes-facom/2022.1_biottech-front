<template>
  <div class="col-12">
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label for="nome">Nome</label>
        <InputText
          v-model="listObj.nome"
          id="nome"
          type="text"
          autofocus
          required />
      </div>
      <div v-if="title == 'Sala'" class="field col-12">
        <label for="nome">Linhagens</label>
        <MultiSelect
          v-model="listObj.linhagens"
          :options="linhagens"
          optionLabel="linhagens"
          placeholder="Selecione as linhagens"
          display="chip">
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
      </div>
      <Button @click="show"> </Button>
    </div>
  </div>
</template>

<script>
import Linhagem from '../../service/LinhagemService'
export default {
  data() {
    return {
      linhagens: null
    }
  },
  props: {
    listObj: Object,
    title: String
  },
  linhagemService: null,
  created() {
    if (this.title == 'Sala') {
      this.linhagemService = new Linhagem()
    }
  },
  mounted() {
    if (this.title == 'Sala') {
      this.linhagemService
        .getLinhagem()
        .then((data) => (this.linhagens = Object.values(data)))
    }
  },
  methods: {
    show() {
      console.log(this.linhagens)
    }
  }
}
</script>
