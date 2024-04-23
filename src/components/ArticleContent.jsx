import { Box, ListItem, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import ArticleTop from "./ArticleTop";

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const ArticleContent = ({ loading = false, article }) => {

    return (
        <>
            {
                loading ? (<Skeleton height="400px" variant="rounded" />) :
                    (<img width="100%" src={article?.image == null ? "https://cataas.com/cat" : article?.image} style={{ maxHeight: "400px", maxWidth: "100%", objectFit: 'contain', borderRadius: "12px" }} />)
            }

            <Typography align="center" variant='h6' mb={1} mt={2}>
                {loading ?
                    <Skeleton /> :
                    <> {article.label} {article?.hidden && <VisibilityOffIcon color="disabled" sx={{ verticalAlign: 'middle' }} fontSize="small" /> }</>
                }
            </Typography>

            <ArticleTop loading={loading} article={article} />

            {loading ? (<Skeleton variant="rounded" height="200px" />) : (<Typography align="justify" style={{ whiteSpace: 'pre-line' }}> {article?.content} </Typography>)}

            <Typography mt={2} color="text.secondary" variant='subtitle2'> { loading ? <Skeleton width={80}/> : <>Теги: {article?.tags}</> }</Typography>
        </>
    )
}

export default ArticleContent;