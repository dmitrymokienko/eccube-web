import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import basicSsl from '@vitejs/plugin-basic-ssl'
// import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  // TODO: revert to https when SSL cert is available
  server: {
    // https: {
    //     key: fs.readFileSync("./src/core/ssl/key.pem"),
    //     cert: fs.readFileSync("./src/core/ssl/cert.pem"),
    // },
    host: 'bidding.eccube.de',
    port: 443,
  },
  plugins: [
    react(),
    svgr(),
    basicSsl(), // dev only !!!
  ],
})
