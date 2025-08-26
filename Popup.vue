<template>
  <div class="flex flex-col items-center p-4 w-[420px] h-[620px] overflow-y-hidden   relative ">
    <!-- Settings & Theme Toggle -->
    <div class="absolute top-3 right-1 flex items-center gap-1">
      <a href="https://github.com/floki1250/icony " target="_blank" class="btn btn-circle btn-ghost">
        <Icon icon="hugeicons:github" class="text-xl" />
      </a>
      <!-- Settings -->
      <button class="btn btn-circle btn-ghost" @click="openSettings = true">
        <Icon icon="hugeicons:settings-01" class="text-xl" />
      </button>
    </div>
    <!-- Gradient Title -->
    <div class="flex gap-2">
      <div>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M38 20V14C38 11.794 36.206 10 34 10H28C28 6.692 25.308 4 22 4C18.692 4 16 6.692 16 10H10C7.794 10 6 11.794 6 14V21.762L7.318 22.24C8.922 22.82 10 24.332 10 26C10 27.668 8.922 29.18 7.318 29.76L6 30.238V38C6 40.206 7.794 42 10 42H17.762L18.24 40.682C18.82 39.078 20.332 38 22 38C23.668 38 25.18 39.078 25.76 40.682L26.238 42H34C36.206 42 38 40.206 38 38V32C41.308 32 44 29.308 44 26C44 22.692 41.308 20 38 20ZM38 28H34L33.994 38H28.904C27.482 35.56 24.86 34 22 34C19.14 34 16.518 35.56 15.096 38H10V32.904C12.44 31.482 14 28.86 14 26C14 23.14 12.44 20.518 10 19.096V14H20V10C20 9.46957 20.2107 8.96086 20.5858 8.58579C20.9609 8.21071 21.4696 8 22 8C22.5304 8 23.0391 8.21071 23.4142 8.58579C23.7893 8.96086 24 9.46957 24 10V14H34V24H38C38.5304 24 39.0391 24.2107 39.4142 24.5858C39.7893 24.9609 40 25.4696 40 26C40 26.5304 39.7893 27.0391 39.4142 27.4142C39.0391 27.7893 38.5304 28 38 28Z"
            fill="url(#paint0_linear_97_2)" />
          <defs>
            <linearGradient id="paint0_linear_97_2" x1="9" y1="14.9999" x2="36.75" y2="41.9999"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#F5005A" />
              <stop offset="0.504808" stop-color="#8C0A5C" />
              <stop offset="1" stop-color="#0065FF" />
            </linearGradient>
          </defs>
        </svg>

      </div>
      <h1
        class="text-5xl poppins font-bold mb-6 bg-gradient-to-l from-red-500 via-[#8C0A5C] to-[#0065FF] bg-clip-text text-transparent tracking-wide">
        Icony
      </h1>
    </div>


    <!-- Search Section -->
    <div class="flex flex-col w-full gap-4">
      <!-- Icon Set Selector -->

      <select id="iconsets" v-model="selectedIconSet" class="select select-ghost bg-base-200 w-full ">
        <option v-for="(iconset, index) in iconsets" :key="index" :value="iconset">
          {{ iconset.name }}
        </option>
      </select>

      <!-- Search Bar -->
      <div class="flex gap-2">
        <input class="input input-ghost bg-base-200 w-full " type="search" placeholder="Search icons..." v-model="query"
          @keyup.enter="search" />
        <button class="btn btn-primary " @click="search" :disabled="loading">
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
    <div v-else-if="results.length > 0" class="grid grid-cols-1 gap-2 mt-6 w-full overflow-y-auto max-h-72">
      <div v-for="(icon, index) in results" :key="index" class="flex justify-between items-center rounded-2xl gap-2 p-2  bg-white border border-base-200  cursor-pointer 
               shadow-md hover:border-primary  transition duration-300">
        <img :src="getIconUrl(icon)" :alt="icon" class="w-10 transition-transform duration-300 group-hover:rotate-6" />
        <p class="text-xs text-center ">{{ icon }}</p>


        <button class="btn btn-link" @click="gotoIconify(icon)">
          <Icon icon="hugeicons:link-02" />
        </button>

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
import { useClipboard } from '@vueuse/core'
import { Icon } from "@iconify/vue";
import { searchIconAi } from './services/iconService'
const source = ref('Icony')
const { text, copy, copied, isSupported } = useClipboard({ source })
const iconsets = ref<{ name: string; prefix: string }[]>([])
const selectedIconSet = ref<{ name: string; prefix: string } | null>(null)
const query = ref('')
const results = ref<string[]>([])
const loading = ref(false)
const openSettings = ref(false)
const apiKey = ref(localStorage.getItem('gemini_api_key') || '')

//results.value = ["package-delivered", "package", "package-outline", "package-variant", "package-variant-closed", "box", "box-outline", "box-download", "box-upload", "truck-delivery", "truck-delivery-outline", "food-takeout-box", "food-takeout-box-outline"]

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