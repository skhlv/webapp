import App from '../components/App'
import HeadlinesList, {HEADLINES_QUERY, headlinesQueryVars,} from '../components/HeadlinesList'
import {addApolloState, initializeApollo} from '../lib/apolloClient'
import {Grid} from "@mui/material";
import NewsFeed, {NEWS_FEED_QUERY, newsFeedQueryVars} from "../components/NewsFeed";

const IndexPage = () => (
    <App>
        <Grid container spacing={2}>
            <Grid xs={8} item={true}>
                <HeadlinesList/>
            </Grid>
            <Grid xs={4} item={true}>
                <NewsFeed />
            </Grid>
        </Grid>
    </App>
)

export async function getServerSideProps() {
    const apolloClient = initializeApollo()

    await Promise.all([
        apolloClient.query({
            query: HEADLINES_QUERY,
            variables: headlinesQueryVars,
        }),
        apolloClient.query({
            query: NEWS_FEED_QUERY,
            variables: newsFeedQueryVars,
        })
    ])

    return addApolloState(apolloClient, {
        props: {},
    })
}

export default IndexPage
