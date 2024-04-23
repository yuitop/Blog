import { Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton, useTheme } from "@mui/material";
import { useEffect } from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Article = ({ idPrefix = "", pk, selected = false, loading = false, image, label, published, hidden, onClick }) => {

    const theme = useTheme()

    return (
        <Card id={"article" + pk + idPrefix} variant='elevation' elevation={0}
            sx={{ bgcolor: selected ? "#8882" : "#0000", maxWidth: { xs: 350, md: 1000 }, minWidth: { xs: 350, md: 0 }, width: { xs: 350, md: 'auto' }, flexShrink: 0, borderRadius: 0 }}
        >

            <CardActionArea onClick={loading ? undefined : onClick} sx={{ padding: 2, paddingBottom: 0 }}>

                {
                    loading ?
                        (<Skeleton variant='rounded' height={200} />) :
                        (<CardMedia image={image == null ? "https://cataas.com/cat" : image} sx={{ height: 200, borderRadius: 2 }} />)
                }

                <CardContent sx={{ p: 0, pt: 1, pb: 1 }} >
                    <Typography color="text.secondary" variant='subtitle2'> {loading ? <Skeleton width={100} /> : (new Date(published).toLocaleDateString("ru"))} </Typography>
                    <Typography variant='body1'> {
                        loading ?
                            <Skeleton /> :
                            <> {label} {hidden && <VisibilityOffIcon color="disabled" sx={{ verticalAlign: 'middle' }} fontSize="small" />}  </>
                    } </Typography>
                </CardContent>

            </CardActionArea>

        </Card>
    )
}

export default Article;