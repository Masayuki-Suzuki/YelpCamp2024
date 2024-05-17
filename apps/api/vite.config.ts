// @ts-ignore
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
    server: {
        port: 4000,
        hmr: true,
    },
    plugins: [
        ...VitePluginNode({
            adapter: "express",
            appPath: "./src/app.ts",
            exportName: "viteNodeApp",
            tsCompiler: "esbuild",
            swcOptions: {}
        })
    ],
})
