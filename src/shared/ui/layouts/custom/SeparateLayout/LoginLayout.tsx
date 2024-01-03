import Box from "@mui/material/Box";
import {
    ISeparateLayoutProps,
    SEPARATE_LAYOUT_COMPACT_BREAKPOINT,
    SEPARATE_LAYOUT_SIDEBAR_WIDTH,
    SeparateLayout,
} from "../../SeparateLayout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EccubeBg from "../../../../assets/images/eccube_bg.jpeg";
import { SidebarRandomContent, getRandomInt } from "./lib/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export interface ILoginLayoutProps extends ISeparateLayoutProps {}

export function LoginLayout(props: ILoginLayoutProps) {
    const { children } = props;

    const navigate = useNavigate();
    const isCompactView = useMediaQuery<Theme>((theme) => theme.breakpoints.down(SEPARATE_LAYOUT_COMPACT_BREAKPOINT));

    const random = getRandomInt();
    const sidebar = SidebarRandomContent[random];

    return (
        <SeparateLayout
            Header={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: isCompactView ? "8px" : "24px",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    Don&apos;t have an Eccube account?
                    <Button
                        variant="outlined"
                        type="submit"
                        fullWidth={false}
                        size="small"
                        onClick={() => {
                            navigate("/"); // signup page
                        }}
                    >
                        Sign up
                    </Button>
                </Box>
            }
            Sidebar={
                <Box pt={6}>
                    <Typography variant="h5" component="h1" color="custom.const.white">
                        {sidebar?.title ?? {}}
                    </Typography>
                    <Typography variant="body1" color="custom.const.white" mt={5}>
                        {sidebar?.description ?? {}}
                    </Typography>
                </Box>
            }
            SideBarProps={{
                sx: {
                    backgroundImage: `url(${EccubeBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                },
            }}
        >
            {children}
        </SeparateLayout>
    );
}
