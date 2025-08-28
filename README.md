[![Build and Release Extension](https://github.com/floki1250/icony/actions/workflows/build.yml/badge.svg)](https://github.com/floki1250/icony/actions/workflows/build.yml)



# <img width="48" height="48" alt="extension_48" src="https://github.com/user-attachments/assets/cc9824cb-510e-4f3f-8894-a2f257b080c6" />  Icony — AI-Powered Icon Search Extension

Icony is a modern and sleek **browser extension** built with **Vue 3** + **TypeScript** that lets you **search icons dynamically** from multiple icon sets.  
It uses **Google Gemini API** to enhance icon discovery based on natural language queries, making it **fast, smart, and efficient**.

---

## ✨ Features

- 🔍 **AI-Powered Search** — Find icons instantly using **Gemini**.
- 🎨 **Dynamic Icon Sets** — Fetch icon sets in real time from [Iconify](https://iconify.design/).
- ⚡ **Fast & Lightweight** — Built with **Vue 3 + Vite** for top performance.
- 🛠️ **API Key Management** — Built-in settings dialog to manage your Gemini API key.
---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/floki1250/icony.git
cd icony
```

Install dependencies:

```bash
npm install
```

Build the extension:

```bash
npm run build
```

---

## 🧩 Usage

1. **Load the extension in your browser:**
   - For Chrome/Edge:
     - Go to `chrome://extensions/`
     - Enable "Developer mode"
     - Click "Load unpacked" and select the `dist` folder inside the project directory.
   - For Firefox:
     - Go to `about:debugging#/runtime/this-firefox`
     - Click "Load Temporary Add-on" and select the `manifest.json` from the `dist` folder.

2. **Set your Gemini API key:**
   - Click the extension icon in your browser.
   - Open the settings dialog.
   - Paste your [Google Gemini API key](https://aistudio.google.com/app/apikey) and save.

3. **Start searching for icons!**
   - Use natural language queries to find the perfect icon.
   - Browse and copy icon code directly.

---

## ⚙️ Development

To start a development server with hot reload:

```bash
npm run dev
```

---

## 🛡️ Security

Your Gemini API key is stored **locally** in your browser and never sent to any third-party server except Google Gemini.

---

## 🙌 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## 📄 License

[Creative Commons Attribution-NonCommercial 4.0 International License](LICENSE)

---

