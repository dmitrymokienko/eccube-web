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
import { useTranslation } from "react-i18next";

export function CompanyOnBoardingPage() {
    // TODO: add validation
    const { t } = useTranslation();
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
                {t("onboarding.company-page.title")}
            </Typography>
            <FormProvider {...form}>
                <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={t("field.company-name")}
                        placeholder={t("placeholder.company-name")}
                        error={!!errors?.company}
                        helperText={errors?.company?.message}
                        {...register("company", {
                            required: t("validation.required"),
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        label={t("field.company-address")}
                        placeholder={"placeholder.company-address"}
                        error={!!errors?.address}
                        helperText={errors?.address?.message}
                        {...register("address", {
                            required: t("validation.required"),
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <Button variant="contained" type="submit" sx={{ marginTop: "24px" }}>
                        {t("button.next")}
                    </Button>
                </Stack>
            </FormProvider>
        </OnboardingLayout>
    );
}
