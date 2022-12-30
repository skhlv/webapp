/** @jsxImportSource @emotion/react */
import {CssBaseline} from "@mui/material";
import Head from "next/head";
import {css, Global} from '@emotion/react'
import theme from "../lib/theme";
import Header from "./Header";

export default function App({children}) {
    return (
        <main>
            <Global
                styles={css`
                  body {
                      background-color: ${theme.palette.primary.main};
                      padding: 2em;
                  }
            `}
            />
            <CssBaseline/>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <Header/>
            {children}
        </main>)
}
