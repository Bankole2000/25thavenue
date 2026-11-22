<script setup lang="ts">
import { navigation } from '~/data/site'

const drawer = ref(false)
</script>

<template>
  <v-app-bar flat color="transparent" height="72" class="app-header">
    <v-container class="d-flex align-center ga-2 py-0">
      <NuxtLink to="/" class="app-header__logo" aria-label="25th Avenue home">
        <img src="/images/brand/logo-yellow.png" alt="" width="544" height="270">
      </NuxtLink>
      <v-spacer />
      <nav class="d-none d-lg-flex align-center ga-1" aria-label="Main">
        <v-btn
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          variant="text"
        >
          {{ item.title }}
        </v-btn>
      </nav>
      <div class="d-none d-xl-block">
        <AppSocialLinks />
      </div>
      <v-btn
        to="/book"
        color="secondary"
        variant="flat"
        class="d-none d-sm-inline-flex ml-2"
      >
        Book a consultation
      </v-btn>
      <v-btn
        icon="mdi-menu"
        variant="text"
        class="d-lg-none"
        aria-label="Open menu"
        @click="drawer = true"
      />
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="right" aria-label="Menu">
    <div class="pa-4">
      <v-btn
        v-for="item in [{ title: 'Home', to: '/' }, ...navigation]"
        :key="item.to"
        :to="item.to"
        variant="text"
        block
        size="large"
        class="justify-start mb-1"
        @click="drawer = false"
      >
        {{ item.title }}
      </v-btn>
      <v-btn
        to="/book"
        color="secondary"
        block
        size="large"
        class="mt-4"
        @click="drawer = false"
      >
        Book a consultation
      </v-btn>
      <AppSocialLinks class="mt-4" />
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
/* Frosted glass: the page shows through, blurred, as it scrolls underneath. */
.app-header {
  border-bottom: 1px solid rgb(255 255 255 / 8%);
  background: rgb(10 10 10 / 45%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  backdrop-filter: blur(16px) saturate(160%);
  color: #fff;
}

/* Browsers without backdrop blur get a more solid bar so the links stay readable. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .app-header {
    background: rgb(10 10 10 / 92%) !important;
  }
}

.app-header__logo {
  display: flex;
  align-items: center;
}

.app-header__logo img {
  display: block;
  width: auto;
  height: 44px;
}
</style>
