import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { useUnit } from "effector-react";
import { IOnboardingCompanyData } from "../../../entities/onboarding/types";
import { onboarding } from "../../../entities/onboarding/model";
import { OnboardingLayout } from "../../../shared/ui/layouts/custom/SeparateLayout/OnboardingLayout";
import { PrevPageButton } from "../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton";
import { useNavigate } from "react-router-dom";
import { startMollieOAuth2Api } from "../../../entities/onboarding/api";
import Box from "@mui/material/Box";
import { LogoutButton } from "../../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton";

export function CompanyOnBoardingPage() {
    // TODO: add validation
    // TODO: add i18n
    const navigate = useNavigate();

    const { company, updateData } = useUnit({
        company: onboarding.$company,
        updateData: onboarding.sendDataFx,
    });

    const form = useForm<IOnboardingCompanyData>({
        defaultValues: {
            company: company?.company,
            address: company?.address,
        },
    });
    const { handleSubmit, register, formState } = form;
    const { errors } = formState;

    const startMollieAuthProcess = async () => {
        const data = await startMollieOAuth2Api()();
        const { authorizationUri } = data || {};
        window.location.assign(authorizationUri);
    };

    const onSubmit = async (data: IOnboardingCompanyData) => {
        onboarding.setCompanyInfo(data);
        await updateData();
        startMollieAuthProcess();
    };

    return (
        <OnboardingLayout
            Header={
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <PrevPageButton
                        onClick={() => {
                            navigate("/onboarding");
                        }}
                    >
                        Previous step
                    </PrevPageButton>

                    <LogoutButton />
                </Box>
            }
        >
            <Typography variant="h4" component="h1" pb={4}>
                Company information
            </Typography>
            <FormProvider {...form}>
                <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={"Company name"}
                        placeholder="Enter company name"
                        error={!!errors?.company}
                        helperText={errors?.company?.message}
                        {...register("company", {
                            required: "This field is required",
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        label={"Address"}
                        placeholder="Enter company address"
                        error={!!errors?.address}
                        helperText={errors?.address?.message}
                        {...register("address", {
                            required: "This field is required",
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <Button variant="contained" type="submit" sx={{ marginTop: "24px" }}>
                        {`Next`}
                    </Button>
                </Stack>
            </FormProvider>
        </OnboardingLayout>
    );
}
