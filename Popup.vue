<template>
  <div class="p-4 w-80">
    <button @click="showSettings = true" class="settings-btn">⚙️</button>

    <!-- Search Form -->
    <select v-model="selectedLibrary">
      <option v-for="lib in libraries" :value="lib.value" :key="lib.value">
        {{ lib.label }}
      </option>
    </select>

    <input v-model="query" placeholder="Describe your icon..." />
    <button @click="searchIcons" :disabled="loading">
      {{ loading ? "Searching..." : "Search" }}
    </button>

    <div v-if="loading" class="mt-2">🔍 Searching icons...</div>

    <div v-if="icons.length && !loading">
      <div v-for="icon in icons" :key="icon" v-html="renderIcon(icon)"></div>
    </div>

    <!-- Settings Modal -->
    <div v-if="showSettings" class="modal">
      <h3>Settings</h3>
      <label>API Key</label>
      <input
        v-model="apiKey"
        placeholder="Enter your API key"
        type="password"
      />
      <label>Max Icons</label>
      <input v-model.number="maxIcons" type="number" min="1" />
      <button @click="saveSettings">Save</button>
      <button @click="showSettings = false">Close</button>
    </div>
  </div>
</template>

<script>
import { fetchAIKeywords, searchIconify } from "./services/iconService";

export default {
  data() {
    return {
      selectedLibrary: "hugeicons",
      libraries: [
        { label: "Hugeicons", value: "hugeicons" },
        { label: "Material Symbols", value: "material-symbols" },
        { label: "Material Design Icons", value: "mdi" },
      ],
      query: "",
      icons: [],
      apiKey: "",
      maxIcons: 10,
      showSettings: false,
      loading: false,
    };
  },
  async mounted() {
    console.log("[Popup] Mounted, loading stored settings...");
    const stored = await chrome.storage.sync.get(["apiKey", "maxIcons"]);
    console.log("[Popup] Stored settings loaded:", stored);
    this.apiKey = stored.apiKey || "";
    this.maxIcons = stored.maxIcons || 10;
  },
  methods: {
    async searchIcons() {
      console.log("[Popup] Search triggered");
      if (!this.apiKey) {
        console.warn("[Popup] No API key found. Aborting search.");
        alert("Please set your API key in settings.");
        return;
      }
      if (!this.query.trim()) {
        console.warn("[Popup] No query entered.");
        return;
      }

      this.loading = true;
      console.log(
        "[Popup] Searching icons for:",
        this.query,
        "in library:",
        this.selectedLibrary
      );

      try {
        const keywords = await fetchAIKeywords(this.query, this.apiKey);
        console.log("[Popup] AI Keywords returned:", keywords);

        const icons = await searchIconify(
          this.selectedLibrary,
          keywords,
          this.maxIcons
        );
        console.log("[Popup] Icons found:", icons);

        this.icons = icons;
      } catch (err) {
        console.error("[Popup] Error during search:", err);
      } finally {
        this.loading = false;
        console.log("[Popup] Search completed");
      }
    },
    async saveSettings() {
      console.log("[Popup] Saving settings:", {
        apiKey: this.apiKey,
        maxIcons: this.maxIcons,
      });
      await chrome.storage.sync.set({
        apiKey: this.apiKey,
        maxIcons: this.maxIcons,
      });
      this.showSettings = false;
    },
    renderIcon(iconName) {
      console.log("[Popup] Rendering icon:", iconName);
      return `<span class="iconify" data-icon="${iconName}" style="font-size:24px;"></span>`;
    },
  },
};
</script>
