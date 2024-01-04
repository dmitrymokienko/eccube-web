import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useUnit } from "effector-react";
import { currentUser } from "../../../entities/currentUser/model";
import { auth } from "../../../entities/auth/model";
import { useNavigate } from "react-router-dom";
import { SignUpLayout } from "../../../shared/ui/layouts/custom/SeparateLayout/SignUpLayout";

export interface ISignUpForm {
    email: string;
    password: string;
    confirmPassword: string;
    isSupplier: boolean;
}

export function SignUpSuccessPage() {
    // TODO: add validation
    // TODO: add i18n
    const navigate = useNavigate();

    const info = useUnit(currentUser.$info);

    const onSubmit = async () => {
        //   TODO: just for test
        // temporary solution
        const user = await auth.activateFx(info!.id);
        currentUser.setInfo(user);
        navigate("/login");
    };

    return (
        <SignUpLayout>
            <Stack spacing={4}>
                <Typography variant="h4" component="h1" pb={2}>
                    Successfully registered
                </Typography>
                <Typography variant="body1" pb={4}>
                    Please check your email and activate your account.
                </Typography>
            </Stack>
            <Button fullWidth variant="contained" color="primary" onClick={onSubmit} sx={{ marginTop: "24px" }}>
                Activate
            </Button>
        </SignUpLayout>
    );
}
