import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const autoImportComponentsConfig = {
  include: [/\.[tj]sx?$/, /\.vue\??/],
  dirs: ['./src/components/**', './src/pages/**'],
}

const autoImportConfig = {
  include: [/\.[tj]sx?$/, /\.vue\??/],
  imports: [
    {
      vue: ['ref', 'watch', 'computed', 'onMounted', 'onUnmounted'],
    },
  ],
  dirs: ['./src/utils', './src/store'],
  dts: './src/auto-imports.d.ts',
}

export default defineConfig(async () => ({
  plugins: [
    vue(),
    AutoImport(autoImportConfig),
    Components(autoImportComponentsConfig),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
}))
