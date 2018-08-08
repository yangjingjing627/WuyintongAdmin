<template>
	<section class="app-main" style="min-height: 100%">
		<transition name="fade" mode="out-in">
			<router-view :key="key"></router-view>
		</transition>
		<wyt-footer></wyt-footer>
	</section>
</template>

<script>
import WytFooter from './WytFooter'
export default {
  name: 'AppMain',
  components: {
    WytFooter
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
