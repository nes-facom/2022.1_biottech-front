<template>
  <div class="card card-w-title">
    <h3>Listas</h3>
    <p>Selecione a lista que deseja acessar.</p>
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
          label: 'Espécie',
          to: '/config/especie'
        },
        {
          label: 'Finalidade',
          to: '/config/finalidade'
        }
      ]
    }
  }
}
</script>
