import {gql, useQuery} from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import {Typography} from "@mui/material";

export const HEADLINE_QUERY = gql`
    query headline($id: ID!) {
        headline(id: $id) {
            id
            title
            summary
            severity
            articles{
                id
                title
                description
                url
                source
            }
        }
    }
`;


export default function HeadlinesDetails({id}) {
    const {loading, error, data, networkStatus} = useQuery(HEADLINE_QUERY, {
        variables: {
            id: id
        }, // Setting this value to true will make the component rerender when
        // the "networkStatus" changes, so we are able to know if it is fetching
        // more data
        notifyOnNetworkStatusChange: true,
    })

    if (error) return <ErrorMessage message="Error loading headline."/>
    if (loading) return <div>Loading</div>

    const {headline} = data

    return (<section>
        <div>
            <Typography
                variant="h1"
                sx={{
                    fontSize: '2em'
                }}
            >{headline.title}</Typography>
            <section>
                <Typography
                    variant="h3"
                >Summary</Typography>
                {headline.summary.map((paragraph, index) => (
                    <Typography paragraph={true} sx={{margin: 0}} key={index}>{paragraph}</Typography>))}
            </section>
            <section>
                <Typography
                    variant="h3"
                >In Detail</Typography>
                {headline.articles.map((article, index) => (
                    <section key={article.id}>
                        <Typography variant="body1" paragraph={true} sx={{margin: 0}}>{article.description}</Typography>
                        <section>
                            <a href={article.url[0]}>
                                <Typography variant="body2" paragraph={false} sx={{margin: 0}}>{article.title}</Typography>
                            </a>
                            <Typography variant="body2" paragraph={false} sx={{margin: 0}}>{article.source}</Typography>
                        </section>
                    </section>
                ))}

            </section>
        </div>
    </section>)
}
