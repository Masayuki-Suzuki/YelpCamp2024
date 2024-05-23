import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode}) => {
    const path = process.cwd()
    console.log(path)
    const env = loadEnv(mode, path, '')

    return {
        plugins: [react()],
        server: {
            watch: {
                usePolling: true
            },
            port: 3000,
        },
        define: {
            'process.env.API_URI': JSON.stringify(env.API_URI)
        }
    }
})
