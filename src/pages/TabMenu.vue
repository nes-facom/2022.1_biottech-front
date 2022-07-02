<template>
  <div class="card card-w-title">
    <h3>Listas</h3>
    <p>Selecione a lista que deseja acessar.</p>
    <Button
      v-if="checkButton()"
      label="Ativos"
      icon="pi pi-pencil"
      @click="active()" />
    <Button
      v-if="!checkButton()"
      label="Desativados"
      icon="pi pi-fw pi-folder"
      @click="disable()" />
    <TabMenu :model="nestedRouteItems" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nestedRouteItems: [
        {
          label: 'Linhagem',
          to: '/config/linhagem'
        },
        {
          label: 'Sala',
          to: '/config/sala'
        },
        {
          label: 'Pesquisa',
          to: '/config/linhapesquisa'
        },
        {
          label: 'Instituição',
          to: '/config/insti'
        },
        {
          label: 'Projeto',
          to: '/config/proj'
        },
        {
          label: 'Laboratório',
          to: '/config/lab'
        },
        {
          label: 'Nível',
          to: '/config/nivelpesquisa'
        },
        {
          label: 'Espécie',
          to: '/config/especie'
        },
        {
          label: 'Finalidade',
          to: '/config/finalidade'
        }
      ]
    }
  },
  methods: {
    active() {
      this.$router.push(this.$route.matched[2].path)
    },
    disable() {
      this.$router.push(this.$route.fullPath + '/desativado')
    },
    checkButton() {
      return window.location.href.includes('/desativado')
    }
  }
}
</script>
