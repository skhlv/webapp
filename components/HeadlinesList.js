import {gql, NetworkStatus, useQuery} from '@apollo/client'
import ErrorMessage from './ErrorMessage'
import {Box, Typography} from "@mui/material";
import theme from "../lib/theme";
import Link from "next/link";

export const HEADLINES_QUERY = gql`
    query headlines($from: Int!, $size: Int!) {
        headlines(from: $from, size: $size) {
            size
            headlines {
                id
                title
                summary
                severity
                articles{
                    id
                    description
                    url
                }
            }
        }
    }
`

export const headlinesQueryVars = {
    from: 0, size: 10,
}

function HeadlineItem({headline}) {
    return (<Box sx={{
        bgcolor: theme.palette.secondary.main,
        padding: '1.5em',
        marginY: '1.5em',
        borderRadius: theme.designBasics.borderRadius
    }}>
        <Link style={{textDecoration: 'none'}} href={"/headlines/id/" + headline.id}>
            <Typography
                variant="h3"
                sx={{
                    fontSize: '2em', color: theme.palette.secondary.contrastText
                }}
            >{headline.title}</Typography>
        </Link>
        {headline.summary.map((paragraph, index) => (
            <Typography paragraph={true} sx={{margin: 0}} key={index}>{paragraph}</Typography>))}
    </Box>)
}

export default function HeadlinesList() {
    const {loading, error, data, fetchMore, networkStatus} = useQuery(HEADLINES_QUERY, {
        variables: headlinesQueryVars, // Setting this value to true will make the component rerender when
        // the "networkStatus" changes, so we are able to know if it is fetching
        // more data
        notifyOnNetworkStatusChange: true,
    })

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    if (error) return <ErrorMessage message="Error loading headlines."/>
    if (loading && !loadingMorePosts) return <div>Loading</div>

    const {headlines} = data

    const loadMorePosts = () => {
        fetchMore({
            variables: {
                from: headlines.length, size: 10
            },
        })
    }

    const areMorePosts = true

    return (<section>
        <div>
            {headlines.headlines.map((headline) => (<HeadlineItem key={headline.id} headline={headline}/>))}
        </div>
        {/*{areMorePosts && (<button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>*/}
        {/*    {loadingMorePosts ? 'Loading...' : 'Show More'}*/}
        {/*</button>)}*/}
    </section>)
}
