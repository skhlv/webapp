import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from "next/image";
import {Box, Container, IconButton, InputBase, Paper} from "@mui/material";
import {Info, Search} from "@mui/icons-material";
import theme from "../lib/theme";

export default function Header() {
    const {pathname} = useRouter()

    return (<Box
            component={'header'}
            sx={{display: 'flex', alignItems: 'stretch', width: '100%'}}
        >
            {/*<Container*/}
            {/*    sx={{p: '2px 4px', flex: 1, display: 'flex', alignItems: 'center', width: '100%'}}*/}
            {/*>*/}
            <Link href="/">
                <Image src={"/logo.svg"} alt={"Security Headlines Logo"} width={200} height={54}/>
            </Link>
            <Paper
                elevation={0}
                component="form"
                sx={{
                    ml: 1,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    width: '50%',
                    maxWidth: '100%',
                    bgcolor: theme.palette.neutral.main
                }}
            >
                <InputBase
                    sx={{ml: 2, mr: 2, flex: 1}}
                    placeholder="Search"
                    inputProps={{'aria-label': 'Search'}}
                />
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <Search/>
                </IconButton>
            </Paper>
            <Info sx={{alignSelf: 'right'}}/>
            {/*</Container>*/}
        </Box>)
}
