<template>
  <div class="app">
    <button class="settings-btn" @click="openSettings = true">
      ⚙️
    </button>
    <h1 class="h1">Icony</h1>

    <!-- Search Bar -->
    <div class="container">
      <!-- Icon Set Selector -->
      <select class="custom-select" v-model="selectedIconSet">
        <option v-for="(iconset, index) in iconsets" :key="index" :value="iconset">
          {{ iconset.name }}
        </option>
      </select>

      <!-- Search Input -->
      <div class="input__container">
        <div class="shadow__input"></div>
        <button class="input__button__shadow" @click="search">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
            <path
              d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
              fill-rule="evenodd" fill="#17202A" />
          </svg>
        </button>
        <input type="search" name="text" class="input__search" placeholder="What do you want to search?" v-model="query"
          @keyup.enter="search" />
      </div>

      <!-- Search Button -->
      <button class="shadow__btn" @click="search" :disabled="loading">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </div>
    <br>
    <!-- Results -->
    <div class="results__container" v-if="results.length > 0">


      <div v-for="(icon, index) in results" :key="index" class="resultsIcon" @click="gotoIconify(icon)">
        <img :src="getIconUrl(icon)" :alt="icon" class="icon-img" />
        <p>{{ icon }}</p>
      </div>

    </div>
    <div v-if="loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
        viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE -->
        <path fill="currentColor"
          d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z">
          <animateTransform attributeName="transform" dur="0.6s" repeatCount="indefinite" type="rotate"
            values="0 12 12;360 12 12" />
        </path>
      </svg>
    </div>
    <div v-else-if="!loading && results.length < 0" class="no-results">
      No results found.
    </div>
    <!-- Settings Dialog -->
    <div v-if="openSettings" class="settings-dialog">
      <div class="dialog-content">
        <h2>Gemini API Key</h2>

        <input id="apiKey" type="password" v-model="apiKey" class="api-input" placeholder="Enter your API key" />

        <div class="dialog-actions">
          <button class="save-btn" @click="saveApiKey">Save</button>
          <button class="cancel-btn" @click="openSettings = false">Exit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { searchIconAi } from './services/iconService'

const iconsets = ref<{ name: string; prefix: string }[]>([])
const selectedIconSet = ref<{ name: string; prefix: string } | null>(null)
const query = ref('')
const results = ref<string[]>([])
const loading = ref(false)
const openSettings = ref(false)

const apiKey = ref(localStorage.getItem('gemini_api_key') || '')


function saveApiKey() {
  localStorage.setItem('gemini_api_key', apiKey.value)
  openSettings.value = false
}
/**
 * Fetch Icon Sets Dynamically from Iconify API
 */
const fetchIconSets = async () => {
  try {
    const response = await fetch('https://api.iconify.design/collections')
    const data = await response.json()

    // Transform into { name, prefix } format
    iconsets.value = Object.keys(data).map((key) => ({
      name: data[key].name,
      prefix: key
    }))

    // Set default selection
    if (iconsets.value.length > 0) {
      selectedIconSet.value = iconsets.value[0]
    }
  } catch (error) {
    console.error('Failed to fetch icon sets:', error)
  }
}

/**
 * Search for icons using your AI service
 */
const search = async () => {
  if (!query.value.trim() || !selectedIconSet.value) return

  loading.value = true
  results.value = []

  try {
    results.value = await searchIconAi(
      query.value,
      selectedIconSet.value.prefix,
      selectedIconSet.value.name
    )
  } catch (error) {
    console.error('Icon search failed:', error)
  } finally {
    loading.value = false
  }
}
function gotoIconify(icon: string) {
  console.log(icon)
  const url = `https://icon-sets.iconify.design/${selectedIconSet.value?.prefix}/?icon-filter=${icon}`
  window.open(url, '_blank')
}
/**
 * Generate Iconify CDN URLs for preview
 */
const getIconUrl = (icon: string) => {
  return `https://api.iconify.design/${selectedIconSet.value?.prefix}/${icon}.svg`
}

// Fetch icon sets on mount
onMounted(fetchIconSets)
</script>