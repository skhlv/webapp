import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../lib/apolloClient'
import {ThemeProvider} from "@mui/material";
import theme from "../lib/theme";

export default function App({Component, pageProps}) {
    const apolloClient = useApollo(pageProps)

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    )
}
