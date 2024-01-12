import Button from "@mui/material/Button";
import { logoutUserApi } from "../../../../../../entities/auth/api";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../../../entities/auth/model";
import { useTranslation } from "react-i18next";

export function LogoutButton() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onClick = async () => {
        await logoutUserApi();
        auth.setRefreshToken(null);
        navigate("/login");
    };

    return (
        <Button fullWidth={false} variant="outlined" onClick={onClick}>
            {t("button.logout")}
        </Button>
    );
}
