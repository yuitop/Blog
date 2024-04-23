import { Drawer, Toolbar, Stack } from "@mui/material"
import Article from "./Article";

const ArticleDrawer = ({ selected, search, loading, articles, onClick }) => {
    const smallWidth = 300
    const wideWidth = 400

    return (
        <Drawer variant="permanent" sx={{
            zIndex: 5,
            width: { sm: smallWidth, lg: wideWidth },
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: { sm: smallWidth, lg: wideWidth }, boxSizing: 'border-box' },
            display: { xs: "none", md: "block" }
        }}>
            <Toolbar />

            <Stack paddingTop={2} paddingBottom={2} spacing={1} sx={{ overflowX: "hidden", overflowY: "auto" }}>
                {
                    loading ?
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem, index) => <Article key={index} loading={true} />) :
                        articles.filter((elem) => (elem.label + elem.tags).toLowerCase().
                            includes( search.toLowerCase() )).map((elem, index) => <Article selected={selected?.pk == elem.pk} onClick={() => onClick(elem)} key={index} {...elem} />)
                }
            </Stack>
        </Drawer>
    )
}

export default ArticleDrawer;