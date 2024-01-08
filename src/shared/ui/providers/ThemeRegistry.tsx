import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { muiTheme } from "../../../core/configs/mui/theme";

export interface IThemeRegistryProps {
    children: ReactNode;
}

export default function ThemeRegistry(props: IThemeRegistryProps) {
    const { children } = props;

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
