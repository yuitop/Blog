import { Divider, Skeleton, Stack, Typography } from "@mui/material"

const ArticleTop = ({ loading, article }) => {

    //date={  } name={  }

    return (
        <Stack direction='row' pb={2}>
            <Typography variant='subtitle2' color='text.secondary'>
                {loading ? <Skeleton width={100} /> : new Date(article?.published).toLocaleString("ru")}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />
            {loading ? <Skeleton width={60} /> : <Typography variant='subtitle2'> {article?.author?.first_name + " " + article?.author?.last_name} </Typography>}
        </Stack>
    )
}

export default ArticleTop