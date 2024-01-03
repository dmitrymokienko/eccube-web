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

export default function UserOnBoardingPage() {
    // TODO: add validation
    // TODO: add i18n
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
                <PrevPageButton
                    onClick={() => {
                        navigate("/onboarding");
                    }}
                >
                    Previous step
                </PrevPageButton>
            }
        >
            <Typography variant="h4" component="h1" pb={4}>
                Your information
            </Typography>
            <FormProvider {...form}>
                <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={"First name"}
                        placeholder="Enter your first name"
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                        {...register("firstName", {
                            required: "This field is required",
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        label={"Last name"}
                        placeholder="Enter your last name"
                        error={!!errors?.lastName}
                        helperText={errors?.lastName?.message}
                        {...register("lastName", {
                            required: "This field is required",
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        label={"Phone number"}
                        placeholder="Enter your phone number"
                        error={!!errors?.phoneNumber}
                        helperText={errors?.phoneNumber?.message}
                        {...register("phoneNumber", {
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
