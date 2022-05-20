<template>
  <div
    class="surface-300 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center" style="min-width: 80%">
      <Card style="width: 40em">
        <template #header>
          <div class="col-12 mt-5 xl:mt-2 text-center">
            <img
              :src="'images/logo/png/logo-text-d.png'"
              alt="Biottech logo"
              style="width: 170px; height: 140px" />
          </div>
        </template>
        <template #title>
          <div class="grid justify-content-center">
            <p class="text-4xl" style="color: #2596be">Seja bem-vindo</p>
          </div>
        </template>
        <template #content>
          <div class="h-full w-full">
            <div class="w-full md:w-10 mx-auto">
              <label
                for="email"
                class="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <InputText
                id="email"
                v-model="email"
                type="text"
                class="w-full mb-5"
                placeholder="Email"
                style="padding: 1rem" />

              <label
                for="senha"
                class="block text-900 font-medium text-xl mb-2">
                Senha
              </label>
              <Password
                id="senha"
                v-model="senha"
                placeholder="senha"
                :toggleMask="true"
                :feedback="false"
                class="w-full mb-3"
                inputClass="w-full"
                inputStyle="padding:1rem"></Password>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="grid justify-content-center mb-5">
            <Button label="Entrar" class="p-button-info w-10 text-xl"></Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      senha: ''
    }
  },
  computed: {
    logoColor() {
      return 'white'
    }
  }
}
</script>
