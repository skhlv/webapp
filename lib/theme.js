import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#EFEBE7',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#C2CEDC'
        },
        background: '#EFEBE7',
        neutral: {
            main: 'rgba(50, 53, 58, 0.13);',
            contrastText: '#000',
        },
        alternative: {
            main: '#E4D8E8'
        }
    },
    typography: {
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    designBasics: {
        borderRadius: '30px'
    }
});

export default theme;
