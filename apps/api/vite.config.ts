// @ts-ignore
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
    server: {
        port: 4000
    },
    plugins: [
        ...VitePluginNode({
            adapter: "express",
            appPath: "./src/app.ts",
            tsCompiler: "esbuild",
            swcOptions: {}
        })
    ],
})
