import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { useUnit } from "effector-react";
import { onboarding } from "../../../entities/onboarding/model";
import { IOnboardingUserData } from "../../../entities/onboarding/types";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../../../shared/ui/layouts/custom/SeparateLayout/OnboardingLayout";
import { PrevPageButton } from "../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton";
import Box from "@mui/material/Box";
import { LogoutButton } from "../../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton";
import { useTranslation } from "react-i18next";

export function UserOnBoardingPage() {
    // TODO: add validation
    const { t } = useTranslation();
    const navigate = useNavigate();

    const user = useUnit(onboarding.$user);

    const form = useForm<IOnboardingUserData>({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
        },
    });
    const { handleSubmit, register, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: IOnboardingUserData) => {
        onboarding.setUserInfo(data);
        navigate("/onboarding/company");
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
                        {t("button.prev-step")}
                    </PrevPageButton>

                    <LogoutButton />
                </Box>
            }
        >
            <Typography variant="h4" component="h1" pb={4}>
                {t("onboarding.user-info-page.title")}
            </Typography>
            <FormProvider {...form}>
                <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={t("field.first-name")}
                        placeholder={t("placeholder.first-name")}
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                        {...register("firstName", {
                            required: t("validation.required"),
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        label={t("field.last-name")}
                        placeholder={t("placeholder.last-name")}
                        error={!!errors?.lastName}
                        helperText={errors?.lastName?.message}
                        {...register("lastName", {
                            required: t("validation.required"),
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        label={t("field.phone")}
                        placeholder={t("placeholder.phone")}
                        error={!!errors?.phoneNumber}
                        helperText={errors?.phoneNumber?.message}
                        {...register("phoneNumber", {
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
