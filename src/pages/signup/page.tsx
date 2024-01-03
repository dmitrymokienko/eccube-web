import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { omit } from "ramda";
import { FormProvider, useForm } from "react-hook-form";
import { currentUser } from "../../entities/currentUser/model";
import { auth } from "../../entities/auth/model";
import { UserType } from "../../entities/currentUser/types";
import { SignUpLayout } from "../../shared/ui/layouts/custom/SeparateLayout/SignUpLayout";
import { useNavigate } from "react-router-dom";

export interface ISignUpForm {
    email: string;
    password: string;
    confirmPassword: string;
    isSupplier: boolean;
}

export function SignUpPage() {
    // TODO: add validation
    // TODO: add i18n
    const navigate = useNavigate();

    const form = useForm<ISignUpForm>();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: ISignUpForm) => {
        const { password, confirmPassword } = data;
        if (password !== confirmPassword) {
            form.setError("confirmPassword", {
                type: "manual",
                message: "Password does not match",
            });
            return;
        }
        try {
            const type = data.isSupplier ? UserType.Supplier : UserType.Customer;
            const payload = omit(["confirmPassword", "isSupplier"], { ...data, type });
            const { id } = await auth.registerFx(payload);
            currentUser.setInfo({ id } as any);
            navigate("/signup/success");
        } catch (error) {
            console.log(error);
            form.setError("email", {
                type: "manual",
                message: "Email already exists",
            });
        }
    };

    return (
        <SignUpLayout>
            <Typography variant="h4" component="h1" pb={4}>
                Sign Up
            </Typography>
            <FormProvider {...form}>
                <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={"Email"}
                        placeholder="Enter email"
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    <TextField
                        type="password"
                        label={"Password"}
                        placeholder="Enter password"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        {...register("password", {
                            required: "Password is required",
                            minLength: 6,
                        })}
                    />
                    <TextField
                        type="password"
                        label={"Confirm Password"}
                        placeholder="Repeat password"
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            minLength: 6,
                        })}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox {...register("isSupplier")} />}
                            label={"I am a supplier"}
                        />
                    </FormGroup>
                    <Button variant="contained" type="submit" sx={{ marginTop: "24px" }}>
                        Continue
                    </Button>
                </Stack>
            </FormProvider>
        </SignUpLayout>
    );
}
