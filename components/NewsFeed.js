import {gql, NetworkStatus, useQuery} from '@apollo/client'
import ErrorMessage from './ErrorMessage'
import {Box, Typography} from "@mui/material";
import theme from "../lib/theme";

export const NEWS_FEED_QUERY = gql`
    query news($from: Int!, $size: Int!) {
        news(from: $from, size: $size) {
            articles {
                id
                date
                title
                severity
                source
                tags
                url
                impact {
                    cvssV3 {
                        score
                        vectorString
                    }
                    cvssV2 {
                        score
                        vectorString
                    }
                }
                classification{
                    cve
                    cwe
                    other
                }
            }
        }
    }
`

export const newsFeedQueryVars = {
    from: 0, size: 10,
}

function NewsFeedItem({article}) {
    return (<Box sx={{
        marginBottom: '1.5em',
    }}>
        <a style={{textDecoration: 'none'}} href={article.url[0]}>
            <Typography
                variant="body1"
                sx={{
                    color: '#000'
                }}
            >{article.title}</Typography>
        </a>
    </Box>)
}

export default function NewsFeed() {
    const {loading, error, data, fetchMore, networkStatus} = useQuery(NEWS_FEED_QUERY, {
        variables: newsFeedQueryVars, // Setting this value to true will make the component rerender when
        // the "networkStatus" changes, so we are able to know if it is fetching
        // more data
        notifyOnNetworkStatusChange: true,
    })

    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    if (error) return <ErrorMessage message="Error loading news."/>
    if (loading && !loadingMorePosts) return <div>Loading</div>

    const {news} = data

    const loadMorePosts = () => {
        fetchMore({
            variables: {
                from: news.articles.length, size: 10
            },
        })
    }

    const areMorePosts = true

    return (
        <section>
            <Box sx={{
                bgcolor: theme.palette.alternative.main,
                padding: '1.5em',
                marginY: '1.5em',
                borderRadius: theme.designBasics.borderRadius
            }}>
                {news.articles.map((article) => (<NewsFeedItem key={article.id} article={article}/>))}
            </Box>
        </section>
    )
}
