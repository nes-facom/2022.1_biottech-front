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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listObj: Object
  }
}
</script>
