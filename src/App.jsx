
import { Box, Divider, Fab, Toolbar } from '@mui/material'
import { useEffect, useRef, useState } from 'react'


import { enqueueSnackbar, useSnackbar } from 'notistack';

import Header from './components/Header';
import ArticleDrawer from './components/ArticleDrawer';
import ArticleDrawerAdaptive from './components/ArticleDrawerAdaptive';
import FloatingControls from './components/FloatingControls';
import Footer from './components/Footer';
import ArticleContent from './components/ArticleContent';
import ArticleForm from './components/ArticleForm';
import AuthContext from './context/AuthContext';
import { getCookie } from './utils';
import AuthDialog from './components/AuthDialog';


import AdbIcon from '@mui/icons-material/Adb';


function App({setMode}) {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  const [state, setState] = useState('view') // 'edit'

  const [articlesList, setArticlesList] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  const [authData, setAuthData] = useState({ username: "anon", role: "viewer" })

  const [search, setSearch] = useState("")

  const selectedRef = useRef('')

  const loadArticles = (displayFirst = false, scroolToSelected = false) => {
    setArticlesList(null)

    fetch("api/articles/get").
      then(data => data.json()).
      then((data) => {
        setArticlesList(data)

        if (displayFirst && data.length > 0) viewArticle(data[0])

        setTimeout(() => scrollToArticle(selectedRef.current), 100)
      }).catch(err => {
        enqueueSnackbar("Ошибка загрузки статей", { variant: "error" })
      })
  }

  const viewArticle = (article) => {
    setState('view')
    loadArticle(article)
  }
  const editArticle = (article) => {
    setState('edit')
    loadArticle(article)
  }

  const loadArticle = (article) => {
    if (article == null) return;

    setSelectedArticle(null)
    selectedRef.current = article.pk

    fetch("api/articles/get/" + article.pk).
      then(data => data.json()).
      then((data) => {
        // data.image = "http://127.0.0.1:8000" + data.image
        setSelectedArticle(data)

        document.location.hash = "#" + data.pk
        if (articlesList != null) scrollToArticle(selectedRef.current)

        document.title = data?.label + " / technews.com"
      }).catch(err => {
        enqueueSnackbar("Ошибка загрузки статей", { variant: "error" })
      })
  }

  const onArticleApplied = (article) => {
    loadArticles()
    viewArticle(article)
  }

  const onArticleDeleted = () => {
    setSelectedArticle(null)
    loadArticles(true)
  }

  const onLogin = () => {
    loadArticles(true)
  }

  const onLogout = () => {
    fetch("api/users/logout").
      then((res) => {
        setState('view')
        enqueueSnackbar("Выход из аккаунта")
        setAuthData({ username: "anon", role: "viewer" })
        loadArticles(true)
      })
  }

  useEffect(() => {
    const pk = document.location.hash.replace('#', '')

    loadArticles(pk.length == 0)
    if (pk.length > 0) loadArticle({ pk: pk })

    fetch("api/users/current").
      then(data => data.json()).
      then(data => {
        // setAuthData( {"username" : "user", "role" : "editor"} )
        setAuthData(data)
      })
  }, [])


  const scrollToArticle = (pk) => {
    var elem = document.getElementById("article" + pk + "adaptive")
    elem?.scrollIntoView({ })

    elem = document.getElementById("article" + pk)
    elem?.scrollIntoView({ behavior: "smooth" })
    // block: 'nearest' , behavior: "smooth", inline: 'center'
  }

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>

      {/* <Fab onClick={scrollToArticle} size='medium' color='primary' sx={{ position: 'fixed', right: 16, top: 100 }}> <AdbIcon /> </Fab> */}

      <FloatingControls loading={selectedArticle == null} state={state} onCreate={() => setState('create')} onEdit={() => editArticle(selectedArticle)} />
      <AuthDialog onLogin={onLogin} authDialogOpen={authDialogOpen} setAuthDialogOpen={setAuthDialogOpen} />

      <Header search={search} setSearch={setSearch} onLogout={onLogout} onLogin={() => setAuthDialogOpen(true)} />

      <Box sx={{ display: { xm : 'block', md : 'flex' } }}>

        <ArticleDrawer selected={selectedArticle} search={search} loading={articlesList == null} articles={articlesList} onClick={viewArticle} />

        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <Toolbar />

          <Box p={4} sx={{ pl: { xs: 4, md: 10 }, pr: { xs: 4, md: 10 }, minHeight: "90vh" }}>
            {state == 'create' && <ArticleForm loading={selectedArticle == null && state != 'create'} onApplied={onArticleApplied} mode={'create'} article={null} />}
            {state == 'edit' && <ArticleForm loading={selectedArticle == null && state != 'create'} onDeleted={onArticleDeleted} onApplied={onArticleApplied} mode={'edit'} article={selectedArticle} />}
            {state == 'view' && <ArticleContent loading={selectedArticle == null} article={selectedArticle} />}
          </Box>

          <Divider flexItem sx={{ display: { xs: "flex", md: "none" } }}></Divider>

          <ArticleDrawerAdaptive selected={selectedArticle} search={search} loading={articlesList == null} articles={articlesList} onClick={viewArticle} />

          <Divider flexItem></Divider>

          <Footer setMode={setMode} />

        </Box>
      </Box>

      {/* <Box bgcolor='red' width='100dvw' sx={{maxWidth: "100%"}}>15</Box> */}

    </AuthContext.Provider>
  )
}

export default App
