import Article from "./Article";
import { Box, Stack } from "@mui/material"

const ArticleDrawerAdaptive = ({ selected, search, loading, articles, onClick }) => {
    return (

        // <div style={{display: "flex", overflowX: 'auto', columnGap: "16px"}}>

        //     {[1, 2, 3].map((elem, index) => <Box bgcolor='red' width="300px" height="200px"/> )}

        // </div>




        <Stack direction='row' p={0} spacing={1} sx={{ overflowY: "hidden", overflowX: "scroll", width: "auto", display: { xs: "flex", md: "none" } }}>
            {
                loading ?
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem, index) => <Article key={index} loading={true} />) :
                    articles.filter((elem) => (elem.label + elem.tags).
                        includes(search)).map((elem, index) => <Article selected={selected?.pk==elem.pk} idPrefix="adaptive" onClick={() => onClick(elem)} key={index} {...elem} />)
            }
        </Stack>



    )
}

export default ArticleDrawerAdaptive