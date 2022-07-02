<template>
  <div
    class="surface-300 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <Toast />
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
                @keyup.enter="login()"
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
                @keyup.enter="login()"
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
            <Button
              :disabled="buttonDisable"
              @click="login()"
              label="Entrar"
              class="p-button-info w-10 text-xl"></Button>
          </div>
          <div class="grid justify-content-center mb-2">
            <p style="margin-top: 20px">
              <a id="installApp" style="cursor: pointer"></a>
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import ApiService from '../service/AuthService'

export default {
  data() {
    return {
      email: '',
      senha: '',
      buttonDisable: false
    }
  },
  computed: {
    logoColor() {
      return 'white'
    }
  },
  mounted() {
    if (window.location.href.includes('/login')) {
      const installApp = document.getElementById('installApp')

      window.addEventListener('load', () => {
        registerSW()
      })

      async function registerSW() {
        if ('serviceWorker' in navigator) {
          try {
            await navigator.serviceWorker.register('sw.js')
          } catch (e) {
            console.log(`SW registration failed`)
          }
        }
      }

      var isChrome = Boolean(window.chrome)
      var isIOSSafari = !!window.navigator.userAgent.match(
        /Version\/[\d\.]+.*Safari/
      )

      if (isChrome) {
        if (
          window.matchMedia('(display-mode: standalone)').matches ||
          window.navigator.standalone === true
        ) {
        } else {
          installApp.innerText = 'Instalar App'
          let deferredPrompt

          window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            deferredPrompt = e
            // Update UI notify the user they can add to home screen
            installApp.style.display = 'block'
          })

          installApp.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            installApp.style.display = 'none'
            // Show the prompt

            deferredPrompt.prompt()

            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
              } else {
              }
              deferredPrompt = null
            })
          })
        }
      } else if (isIOSSafari) {
        if (
          window.matchMedia('(display-mode: standalone)').matches ||
          window.navigator.standalone === true
        ) {
        } else {
          $(document).Toasts('create', {
            class: 'bg-info',
            title: 'ATENÇÃO',
            position: 'bottomRight',
            body: 'Instale este aplicativo no seu Iphone: Clique na guia <img style="width: 25px;" src="icon/icon-iphone.jpg" alt=""> e depois em "Adicionar à Tela Início".'
          })
        }
      } else {
        $(document).Toasts('create', {
          class: 'bg-info',
          title: 'ATENÇÃO',
          position: 'bottomRight',
          body: 'Para instalar o APP no Android, Windows ou Mac OS é necessário entrar nesse site usando um navegador Google Chrome, para instalar no Iphone, use o navegador Safari.'
        })
      }
    }
  },
  methods: {
    showError() {
      this.$toast.add({
        severity: 'error',
        summary: 'E-mail ou Senha incorreto.',
        life: 4000
      })
    },
    login() {
      this.buttonDisable = true
      ApiService.login(this.email, this.senha, (success) => {
        if (success) {
          window.location.href = '/'
        } else {
          this.showError()
          this.buttonDisable = false
        }
      })
    }
  }
}
</script>
