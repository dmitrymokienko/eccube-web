import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { LoginLayout } from "../../shared/ui/layouts/custom/SeparateLayout/LoginLayout";
import { auth } from "../../entities/auth/model";
import { useNavigate } from "react-router-dom";

export interface ILoginForm {
    email: string;
    password: string;
}

export function LoginPage() {
    // TODO: add validation
    // TODO: add i18n
    const navigate = useNavigate();

    const form = useForm<ILoginForm>();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: ILoginForm) => {
        try {
            await auth.loginFx(data);
            navigate("/onboarding");
        } catch (error) {
            form.setError("email", { message: "Email or password is incorrect" });
        }
    };

    return (
        <LoginLayout>
            <Typography variant="h4" component="h1" pb={4}>
                Login
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
                    <Button variant="contained" type="submit" sx={{ marginTop: "24px" }}>
                        Continue
                    </Button>
                </Stack>
            </FormProvider>
        </LoginLayout>
    );
}
