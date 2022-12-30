import App from "../../../components/App";
import HeadlineDetails from "../../../components/HeadlineDetails";
import {addApolloState, initializeApollo} from "../../../lib/apolloClient";
import {useRouter} from "next/router";
import {HEADLINE_QUERY} from "../../../components/HeadlineDetails";

const HeadlinePage = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <App>
            <HeadlineDetails id={id}/>
        </App>
    );
}

export async function getServerSideProps({params}) {
    const apolloClient = initializeApollo()
    const id = params.id;

    await apolloClient.query({
        query: HEADLINE_QUERY,
        variables: {
            id: id
        },
    })

    return addApolloState(apolloClient, {
        props: {},
    })
}

export default HeadlinePage
