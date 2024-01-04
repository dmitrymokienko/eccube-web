import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {
            // key: fs.readFileSync("./certificates/key.pem"),
            // cert: fs.readFileSync("./certificates/cert.pem"),
            key: fs.readFileSync("./certificates/bidding.eccube.key"),
            cert: fs.readFileSync("./certificates/bidding.eccube.crt"),
        },
    },
    plugins: [
        react(),
        svgr(),
        // basicSsl(), // dev only !!!

        // svgr({
        //     svgrOptions: {
        //         plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        //         svgoConfig: {
        //             plugins: [
        //                 {
        //                     name: "preset-default",
        //                     params: {
        //                         overrides: {
        //                             /*
        //                              * Prevent removing "viewBox" attribute to allow resizing images
        //                              * via CSS `height` and `width` properties.
        //                              */
        //                             removeViewBox: false,
        //                             /*
        //                              * Prevent prefixing class names to allow SVG customization
        //                              * via CSS.
        //                              */
        //                             // prefixClassNames: false,
        //                         },
        //                     },
        //                 },
        //                 /**
        //                  * Enable IDs prefixing to avoid collisions across multiple SVGs.
        //                  */
        //                 "prefixIds",
        //             ],
        //         },
        //     },
        // }),
    ],
});
