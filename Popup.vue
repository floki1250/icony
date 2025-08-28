<template>

  <div
    class="overflow-hidden flex flex-col items-center p-4 w-[420px] h-[620px] overflow-y-hidden bg-base-200 relative ">
    <!-- Settings & Theme Toggle -->
    <div class="absolute top-3 right-1 flex items-center gap-1">
      <a href="https://github.com/floki1250/icony " target="_blank" class="btn btn-circle btn-ghost">
        <Icon icon="hugeicons:github" class="text-xl" />
      </a>
      <!-- Settings -->
      <button class="btn btn-circle btn-ghost " @click="openSettings = true">
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
          <path
            d="M22 4.5C25.0319 4.5 27.5 6.96814 27.5 10V10.5H34C35.9299 10.5 37.5 12.0701 37.5 14V20.5H38C41.0319 20.5 43.5 22.9681 43.5 26C43.5 29.0319 41.0319 31.5 38 31.5H37.5V38C37.5 39.9299 35.9299 41.5 34 41.5H26.5889L26.2305 40.5117C25.5809 38.7156 23.8847 37.5 22 37.5C20.2329 37.5 18.6316 38.5688 17.9033 40.1826L17.7695 40.5117L17.4111 41.5H10C8.07014 41.5 6.5 39.9299 6.5 38V30.5879L7.48828 30.2305C9.28437 29.5809 10.5 27.8847 10.5 26C10.5 24.2329 9.43123 22.6316 7.81738 21.9033L7.48828 21.7695L6.5 21.4111V14C6.5 12.0701 8.07014 10.5 10 10.5H16.5V10C16.5 6.96814 18.9681 4.5 22 4.5ZM22 7.5C21.337 7.5 20.7013 7.76358 20.2324 8.23242C19.7636 8.70126 19.5 9.33696 19.5 10V13.5H9.5V19.3838L9.74805 19.5283C12.0389 20.8634 13.5 23.3231 13.5 26C13.5 28.6769 12.0389 31.1366 9.74805 32.4717L9.5 32.6162V38.5H15.3838L15.5283 38.252C16.8634 35.9611 19.3231 34.5 22 34.5C24.6769 34.5 27.1366 35.9611 28.4717 38.252L28.6162 38.5H34.4941V38L34.5 28.5H38C38.663 28.5 39.2987 28.2364 39.7676 27.7676C40.2364 27.2987 40.5 26.663 40.5 26C40.5 25.337 40.2364 24.7013 39.7676 24.2324C39.2987 23.7636 38.663 23.5 38 23.5H34.5V13.5H24.5V10C24.5 9.33696 24.2364 8.70126 23.7676 8.23242C23.2987 7.76358 22.663 7.5 22 7.5Z"
            stroke="black" stroke-opacity="0.1" />
          <defs>
            <linearGradient id="paint0_linear_97_2" x1="27" y1="19" x2="4" y2="25" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00D3BB" />
              <stop offset="1" stop-color="#80DB00" />
            </linearGradient>
          </defs>
        </svg>

      </div>
      <h1 class="text-5xl poppins font-bold mb-6 text-neutral-800 bg-clip-text  tracking-wide">
        Icony
      </h1>
    </div>


    <!-- Search Section -->
    <div class="flex flex-col w-full gap-4">
      <!-- Icon Set Selector -->
      <!-- Replace your <select> with this -->
      <div class="rounded-xl  bg-base-100 shadow-md w-full relative">
        <input type="search" v-model="searchQuery" placeholder="Search icon set..." class="rounded-xl p-2.5 w-full"
          @input="showDropdown = true" @focus="showDropdown = true" @blur="hideDropdown" />

        <!-- Dropdown List -->
        <ul v-show="showDropdown && filteredIconSets.length"
          class="absolute z-50 bg-white top-10 max-h-42 w-full overflow-auto p-2 rounded-2xl shadow-md">
          <li v-for="(iconset, index) in filteredIconSets" :key="index" @mousedown.prevent="selectIconSet(iconset)"
            class="cursor-pointer p-1 hover:bg-base-200 rounded-xl">
            {{ iconset.name }}
          </li>
        </ul>
      </div>



      <!-- Search Bar -->
      <div class="flex gap-2">
        <input class="input input-ghost bg-base-100 shadow-md w-full " type="search" placeholder="Search icons..."
          v-model="query" @keyup.enter="search" />
        <button class="btn btn-primary text-white" @click="search" :disabled="loading">
          <Icon icon="hugeicons:search-01" class="w-5 h-5 mr-1" />
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center mt-4">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Results Section -->
    <div v-else-if="results.length > 0"
      class="grid grid-cols-1 gap-2  w-full overflow-y-auto h-full my-4 bg-transparent ">
      <div v-for="(icon, index) in results" :key="index" class="flex justify-between items-center rounded-2xl gap-2 p-2  bg-white border border-base-200  cursor-pointer 
               shadow-md hover:border-primary  transition duration-300">
        <img :src="getIconUrl(icon)" :alt="icon" class="w-10 transition-transform duration-300 group-hover:rotate-6" />
        <p class="text-xs text-center ">{{ icon }}</p>
        <button class="btn rounded-xl btn-link" @click="gotoIconify(icon)">
          <Icon icon="hugeicons:link-02" />
        </button>

      </div>
    </div>

    <div v-else class="mt-6 text-gray-400 text-sm">No results found.</div>

    <!-- Settings Modal -->
    <dialog v-if="openSettings" class="modal modal-open">
      <div class="modal-box backdrop-blur-xl  ">
        <h3 class="font-bold text-lg mb-3">Gemini API Key</h3>
        <input v-model="apiKey" type="password" class="input w-full mb-4   " placeholder="Enter your API key" />
        <div class="modal-action">
          <button class="btn rounded-xl btn-primary text-white" @click="saveApiKey">
            <Icon icon="hugeicons:checkmark-circle-01" class="w-5 h-5 mr-1" /> Save
          </button>
          <button class="btn rounded-xl btn-error text-white" @click="openSettings = false">
            <Icon icon="hugeicons:cancel-circle" class="w-5 h-5 mr-1" /> Cancel
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Icon } from "@iconify/vue";
import { searchIconAi } from './services/iconService'
const source = ref('Icony')
const { text, copy, copied, isSupported } = useClipboard({ source })
const iconsets = ref<{ name: string; prefix: string }[]>([])
const selectedIconSet = ref<{ name: string; prefix: string } | null>(null)
const query = ref('')
const searchQuery = ref('')
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
const showDropdown = ref(false);

// Filter results based on the search query
const filteredIconSets = computed(() =>
  iconsets.value.filter(iconset =>
    iconset.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function selectIconSet(iconset: { name: string; prefix: string }) {
  selectedIconSet.value = iconset;
  searchQuery.value = iconset.name;
  showDropdown.value = false;
}

function hideDropdown() {
  // Small delay to allow click selection before hiding
  setTimeout(() => {
    showDropdown.value = false;
  }, 150);
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