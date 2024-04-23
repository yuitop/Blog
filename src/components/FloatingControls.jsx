import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { Fab } from "@mui/material"
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const FloatingControls = ({ loading, state, onCreate, onEdit }) => {

    const { authData } = useContext(AuthContext)

    return <>
        {
            (state != 'create' && (authData.role == 'admin'  || authData.role == 'writer') ) &&
            <Fab disabled={loading} onClick={onCreate} size='medium' color='primary' sx={{ position: 'fixed', right: 16, bottom: 16 }}> <AddIcon /> </Fab>
        }

        {
            (state == 'view' && (authData.role == 'admin')) &&
            <Fab disabled={loading} onClick={onEdit} size='medium' sx={{ position: 'fixed', right: 16, bottom: 80 }}> <EditIcon /> </Fab>
        }
    </>
}

export default FloatingControls