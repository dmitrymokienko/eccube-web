import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import ThemeRegistry from "./shared/ui/providers/ThemeRegistry.js";
import "./index.css";
import "@fontsource/roboto-condensed/400.css";
import "@fontsource/roboto-condensed/500.css";
import "@fontsource/roboto-condensed/700.css";
import "@fontsource/montserrat/500.css";
import { SignUpPage } from "./pages/signup/page";
import LoginPage from "./pages/login/page";
import WelcomeOnBoardingPage from "./pages/onboarding/page";
import SignUpSuccessPage from "./pages/signup/success/page";
import UserOnBoardingPage from "./pages/onboarding/user/page.js";
import CompanyOnBoardingPage from "./pages/onboarding/company/page.js";
import MollieOnBoardingPage from "./pages/onboarding/mollie/page.js";

// TODO: core/routing
const router = createBrowserRouter([
    {
        path: "/",
        element: <SignUpPage />,
        children: [
            {
                path: "/success",
                element: <SignUpSuccessPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/onboarding",
        element: <WelcomeOnBoardingPage />,
        children: [
            {
                path: "/onboarding/user",
                element: <UserOnBoardingPage />,
            },
            {
                path: "/onboarding/company",
                element: <CompanyOnBoardingPage />,
            },
            {
                path: "/onboarding/mollie",
                element: <MollieOnBoardingPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRegistry>
            <NiceModal.Provider>
                <RouterProvider router={router} />
            </NiceModal.Provider>
        </ThemeRegistry>
    </React.StrictMode>
);
