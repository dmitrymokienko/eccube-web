import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import ThemeRegistry from "./shared/ui/providers/ThemeRegistry";
import "@fontsource/roboto-condensed/400.css";
import "@fontsource/roboto-condensed/500.css";
import "@fontsource/roboto-condensed/700.css";
import "@fontsource/bebas-neue/400.css";
import { AuthProvider } from "./shared/ui/providers/AuthProvider";
import { router } from "./core/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRegistry>
            <NiceModal.Provider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </NiceModal.Provider>
        </ThemeRegistry>
    </React.StrictMode>
);
