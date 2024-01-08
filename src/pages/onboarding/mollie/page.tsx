import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { OnboardingLayout } from "../../../shared/ui/layouts/custom/SeparateLayout/OnboardingLayout";
import { PrevPageButton } from "../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton";
import { useNavigate } from "react-router-dom";
import { getMollieOAuth2AccessTokenApi } from "../../../entities/onboarding/api";

export function MollieCallbackPage() {
    const navigate = useNavigate();
    const called = useRef(false);
    // const { checkLoginState, loggedIn } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                if (called.current) return; // prevent rerender caused by StrictMode
                called.current = true;

                const search = window.location.search;
                const code = new URLSearchParams(search).get("code");

                const res = await getMollieOAuth2AccessTokenApi()(code!);
                // const res = await apiClient.get<unknown>(`/mollie/auth/token${window.location.search}`); // await getMollieOAuth2AccessTokenApi()(code!);
                console.log("response: ", res);
                // navigate("/main");
            } catch (err) {
                console.error(err);
                // navigate("/main");
            }
        })();
    }, [navigate]);

    const onSubmit = async () => {
        navigate("/main");
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
            <Typography variant="body1" component="h1" gutterBottom>
                Successfully connected to Mollie
            </Typography>
            <Button variant="contained" sx={{ marginTop: "24px" }} onClick={onSubmit}>
                {`Continue`}
            </Button>
        </OnboardingLayout>
    );
}
