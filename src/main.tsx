import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import ThemeRegistry from "./shared/ui/providers/ThemeRegistry.js";
import "./index.css";
import "@fontsource/roboto-condensed/400.css";
import "@fontsource/roboto-condensed/500.css";
import "@fontsource/roboto-condensed/700.css";
import "@fontsource/bebas-neue/400.css";
import { SignUpPage } from "./pages/signup/page";
import { LoginPage } from "./pages/login/page";
import { WelcomeOnBoardingPage } from "./pages/onboarding/page";
import { SignUpSuccessPage } from "./pages/signup/success/page";
import { UserOnBoardingPage } from "./pages/onboarding/user/page";
import { CompanyOnBoardingPage } from "./pages/onboarding/company/page";
import { MollieCallbackPage } from "./pages/onboarding/mollie/page";
import { AuthProvider } from "./shared/ui/providers/AuthProvider";
import { ProtectedRoute } from "./core/routes/ProtectedRoute.js";

// TODO: core/routing
const router = createBrowserRouter([
    {
        path: "/",
        element: <SignUpPage />,
    },
    {
        path: "/signup",
        children: [
            {
                index: true,
                element: <SignUpPage />,
            },
            {
                path: "success",
                element: <SignUpSuccessPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/callback",
        element: <MollieCallbackPage />,
    },
    {
        path: "/onboarding",
        element: <ProtectedRoute />,
        children: [
            {
                index: true,
                element: <WelcomeOnBoardingPage />,
            },
            {
                path: "user",
                element: <UserOnBoardingPage />,
            },
            {
                path: "company",
                element: <CompanyOnBoardingPage />,
            },
            // {
            //     path: "mollie",
            //     element: <MollieCallbackPage />,
            // },
        ],
    },
    {
        path: "*",
        element: <div>404</div>,
    },
]);

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
