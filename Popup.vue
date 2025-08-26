<template>
  <div class="flex flex-col items-center p-4 w-[420px] h-[620px]   relative 
            ">

    <!-- Settings & Theme Toggle -->
    <div class="absolute top-3 right-3 flex items-center gap-2">
      <!-- Settings -->
      <button class="btn btn-circle btn-ghost" @click="openSettings = true">
        <Icon icon="hugeicons:settings-01" class="w-5 h-5" />
      </button>
    </div>

    <!-- Gradient Title -->
    <h1
      class="text-5xl poppins font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent tracking-wide">
      Icony
    </h1>

    <!-- Search Section -->
    <div class="flex flex-col w-full gap-4">
      <!-- Icon Set Selector -->
      <select v-model="selectedIconSet" class="select select-bordered w-full ">
        <option v-for="(iconset, index) in iconsets" :key="index" :value="iconset">
          {{ iconset.name }}
        </option>
      </select>

      <!-- Search Bar -->
      <div class="join w-full">
        <input type="search" placeholder="Search icons..." v-model="query" @keyup.enter="search"
          class="input  join-item w-full  " />
        <button class="btn btn-primary join-item" @click="search" :disabled="loading">
          <Icon icon="hugeicons:search-01" class="w-5 h-5 mr-1" />
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center mt-6">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Results Section -->
    <div v-else-if="results.length > 0" class="grid grid-cols-4 gap-4 mt-6 w-full overflow-y-auto max-h-72">
      <div v-for="(icon, index) in results" :key="index" class="group card bg-white/10 backdrop-blur-lg border border-white/20 shadow-md p-3 items-center justify-center cursor-pointer 
               hover:scale-110 hover:shadow-xl hover:bg-white/20 transition duration-300" @click="gotoIconify(icon)">
        <img :src="getIconUrl(icon)" :alt="icon"
          class="w-10 h-10 transition-transform duration-300 group-hover:rotate-6" />
        <p class="text-xs text-center mt-1 truncate text-white">{{ icon }}</p>
      </div>
    </div>

    <div v-else class="mt-6 text-gray-400 text-sm">No results found.</div>

    <!-- Settings Modal -->
    <dialog v-if="openSettings" class="modal modal-open">
      <div class="modal-box backdrop-blur-xl border ">
        <h3 class="font-bold text-lg mb-3">Gemini API Key</h3>
        <input v-model="apiKey" type="password" class="input w-full mb-4   " placeholder="Enter your API key" />
        <div class="modal-action">
          <button class="btn btn-primary" @click="saveApiKey">
            <Icon icon="hugeicons:checkmark-circle-01" class="w-5 h-5 mr-1" /> Save
          </button>
          <button class="btn btn-error text-white" @click="openSettings = false">
            <Icon icon="hugeicons:cancel-circle" class="w-5 h-5 mr-1" /> Cancel
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from "@iconify/vue";
import { searchIconAi } from './services/iconService'

const iconsets = ref<{ name: string; prefix: string }[]>([])
const selectedIconSet = ref<{ name: string; prefix: string } | null>(null)
const query = ref('')
const results = ref<string[]>([])
const loading = ref(false)
const openSettings = ref(false)
const apiKey = ref(localStorage.getItem('gemini_api_key') || '')
const theme = ref(localStorage.getItem('theme') || 'light')

/**
 * Save API Key to Local Storage
 */
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