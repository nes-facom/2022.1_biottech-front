<template>
  <div class="layout-footer">
    <img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    footerImage() {
      return 'images/logo/png/logo-img.png'
    }
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme
    }
  }
}
</script>
