import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync("./src/core/ssl/bidding.eccube.key"),
            cert: fs.readFileSync("./src/core/ssl/bidding.eccube.crt"),
        },
        host: "bidding.eccube.de",
        port: 443,
    },
    plugins: [
        react(),
        svgr(),
        // basicSsl(), // dev only !!!
    ],
});
