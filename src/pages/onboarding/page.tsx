import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { OnboardingLayout } from "../../shared/ui/layouts/custom/SeparateLayout/OnboardingLayout";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton";
import Box from "@mui/material/Box";

export function WelcomeOnBoardingPage() {
    // TODO: add validation
    // TODO: add i18n
    const navigate = useNavigate();

    const form = useForm();
    const { handleSubmit } = form;

    const onSubmit = async () => {
        navigate("/onboarding/user");
    };

    return (
        <OnboardingLayout
            Header={
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                    <LogoutButton />
                </Box>
            }
        >
            <Typography variant="h4" component="h1" pb={4}>
                Welcome to Eccube!
            </Typography>
            <FormProvider {...form}>
                <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="body1" component="h1" gutterBottom>
                        Before we start, please tell us a little bit about your company and yourself.
                        <br />
                        Please click the button below to continue.
                    </Typography>
                    <Button variant="contained" type="submit" sx={{ marginTop: "24px" }}>
                        Start
                    </Button>
                </Stack>
            </FormProvider>
        </OnboardingLayout>
    );
}
