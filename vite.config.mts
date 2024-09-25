import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'NaiveStorage',
            fileName: (format) => `naive-storage.${format}.js`
        },
        sourcemap: true,
        target: "es2015"
    },
})