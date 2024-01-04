import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { Nullable } from "../../../shared/types";
import { useApiClient } from "../../../core/api/useApiClient";
import { startMollieAuthApi } from "../../../entities/onboarding/api";
import { OnboardingLayout } from "../../../shared/ui/layouts/custom/SeparateLayout/OnboardingLayout";
import { PrevPageButton } from "../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton";
import { useNavigate } from "react-router-dom";

const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;

export function MollieOnBoardingPage() {
    // TODO: add validation
    // TODO: add i18n
    const apiClient = useApiClient();
    const navigate = useNavigate();

    const popupRef = useRef<Nullable<Window>>();

    // fast solution
    // TODO: refactor, use MuiDialog
    const openPopup = (url: string) => {
        const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
        const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
        return window.open(url, "OAuth2 Popup", `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`);
    };

    useEffect(() => {
        const startMollieAuthProcess = async () => {
            const data = await startMollieAuthApi(apiClient)();
            const { authorizationUri } = data || {};
            popupRef.current = openPopup(authorizationUri);
        };
        const handleMessageListener = (event: MessageEvent) => {
            console.log(event?.data);
        };
        window.addEventListener("message", handleMessageListener);
        startMollieAuthProcess();
        return () => {
            window.removeEventListener("message", handleMessageListener);
        };
    }, []);

    const onSubmit = async () => {
        try {
            navigate("/main");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <OnboardingLayout
            Header={
                <PrevPageButton
                    onClick={() => {
                        navigate("/onboarding/company");
                    }}
                >
                    Previous step
                </PrevPageButton>
            }
        >
            <Typography variant="h4" component="h1" pb={4}>
                Mollie authorization
            </Typography>
            <Button variant="contained" sx={{ marginTop: "24px" }} onClick={onSubmit}>
                {`Finish`}
            </Button>
        </OnboardingLayout>
    );
}
