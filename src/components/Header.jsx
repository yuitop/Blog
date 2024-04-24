import { AppBar, Toolbar, Typography, TextField, InputAdornment, IconButton, Divider, SvgIcon, useTheme, Box } from "@mui/material"

import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Controller } from "react-hook-form";


const Logo = () => {
    const theme = useTheme()

    return <SvgIcon fontSize='large'>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.22216 10.9547C9.82931 8.34843 14.0563 8.34843 16.6635 10.9547L31.4188 25.7051C34.026 28.3114 34.026 32.537 31.4188 35.1432L28.652 37.9091C26.0449 40.5154 21.8178 40.5154 19.2107 37.9091L4.45536 23.1587C1.84821 20.5524 1.84821 16.3268 4.45536 13.7206L7.22216 10.9547Z" fill={theme.palette.primary.dark} />
            <path d="M40.7778 11.0909C38.1707 8.48463 33.9437 8.48463 31.3365 11.0909L11.8605 30.5604L19.348 38.0453C21.9551 40.6516 26.1821 40.6516 28.7893 38.0453L43.5446 23.2949C46.1518 20.6886 46.1518 16.463 43.5446 13.8568L40.7778 11.0909Z" fill={theme.palette.primary.main} />
        </svg>
    </SvgIcon>
}


const Header = ({ search, setSearch, onLogin, onLogout }) => {

    const { authData } = useContext(AuthContext)
    const [childSearch, setChildSearch] = useState(search)

    const [searchFocus, setSearchFocus] = useState(false)
    const searchFieldRef = useRef(null)

    return (

        <AppBar position='fixed' color='default' variant='outlined' elevation={0} sx={{ zIndex: 9 }}>
            <Toolbar sx={{ display: "flex", columnGap: 1, paddingLeft: { xs: 1, sm: 3 }, paddingRight: { xs: 1, sm: 3 } }}>

                <Logo />

                <Typography color='text' variant='h6' sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>TECHNEWS</Typography>
                {!(searchFocus || childSearch.length > 0) && <Box sx={{ flexGrow: 1, }} />}


                <IconButton
                    onClick={() => {
                        setSearchFocus(true)

                        setTimeout(() => searchFieldRef.current.focus(), 10)
                    }}
                    sx={{ display: { xs: (searchFocus || childSearch.length > 0) ? 'none' : 'inherit', sm: 'none' } }}
                >
                    <SearchIcon />
                </IconButton>

                <TextField name="submit" type='search' value={childSearch} onChange={e => setChildSearch(e.target.value)}
                    onKeyDown={e => { if (e.key == "Enter") e.target.blur() }}
                    inputRef={searchFieldRef}
                    onFocus={() => setSearchFocus(true)} onBlur={() => { setSearch(childSearch); setSearchFocus(false) }}
                    sx={{
                        flexGrow: { xs: 1, sm: 0 },
                        display: { xs: (searchFocus || childSearch.length > 0) ? 'inherit' : 'none', sm: 'inherit' }
                    }}
                    placeholder='Поиск' size='small' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {authData.username != "anon" ?
                    <>
                        <Typography sx={{ display: { xs: "none", sm: "block" } }} ml={1}> {authData.username} </Typography>
                        <IconButton color='error' onClick={onLogout}> <LogoutIcon /> </IconButton>
                    </> :

                    <IconButton onClick={onLogin}> <LoginIcon /> </IconButton>
                }

            </Toolbar>
        </AppBar>

    )
}

export default Header;