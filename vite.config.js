import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import UnoCSS from "unocss/vite";
import presetIcons from '@unocss/preset-icons';
import transformerDirective from "@unocss/transformer-directives";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },
  // server: {
  //   https: true
  // },
  plugins: [
    vue(),
    // basicSsl(),
    UnoCSS({
      transformers: [transformerDirective()],
      presets: [
        presetIcons({
          collections: {
            materialSymbols: () =>
              import("@iconify-json/material-symbols/icons.json").then(
                (i) => i.default
              ),
          },
        }),
      ],
    }),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        }
      ],
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
})
