<template>
  <ThemeSwitcher />
</template>

<script setup>
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { inject } from '@vercel/analytics';

inject();
</script>

<style>
@import './styles/theme.css';
</style> 