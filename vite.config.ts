import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"
import tailwindCss from "@tailwindcss/vite"
import {tanstackRouter} from "@tanstack/router-plugin/vite";
export default defineConfig({
    plugins:[tanstackRouter(),react(),tailwindCss()],
    build:{
        outDir:'dist'
    }
})