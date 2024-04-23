import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getCookie } from "../utils";
import { Controller, useForm } from "react-hook-form";

const AuthDialog = ({ onLogin, authDialogOpen, setAuthDialogOpen }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setAuthData } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const onConfirm = ({ username, password }) => {
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('csrfmiddlewaretoken', getCookie("csrftoken"))

        setLoading(true)

        fetch("api/users/login", {
            method: "POST",
            body: formData,
            credentials: "include"
        }).
            then(res => res.json()).
            then((res) => {
                enqueueSnackbar("Вход в аккаунт")
                setAuthData(res)

                setAuthDialogOpen(false)
                onLogin()
            }).
            catch(err => {
                enqueueSnackbar("Ошибка авторизации", { variant: "error" })
            }).
            finally(() => setLoading(false))
    }

    const { control, handleSubmit, formState } = useForm({ defaultValues: { username: "", password: "" } })

    return <>
        <Dialog open={authDialogOpen} sx={{ zIndex: 10 }}>

            <form noValidate onSubmit={handleSubmit((data) => onConfirm(data))}>

                <DialogTitle>Авторизация</DialogTitle>
                <DialogContent>
                    {/* <TextField value={username} onChange={e => setUsername(e.target.value)} autoFocus required margin="dense" label="Логин" fullWidth size='small' />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} autoFocus required margin="dense" label="Пароль" fullWidth size='small' /> */}

                    <Controller render={({ field: { onChange, onBlur, value } }) => (
                        <TextField onBlur={onBlur} onChange={onChange} value={value}
                            error={!!formState.errors.username} helperText={formState.errors.username?.message}
                            disabled={loading || !authDialogOpen}
                            fullWidth margin='dense' size='small' label='Логин' />
                    )} control={control} name="username" rules={{ required: "Заполните поле" }} />

                    <Controller render={({ field: { onChange, onBlur, value } }) => (
                        <TextField error={!!formState.errors.password} helperText={formState.errors.password?.message}
                            disabled={loading || !authDialogOpen}
                            onBlur={onBlur} onChange={onChange} value={value}
                            fullWidth margin='dense' size='small' label='Пароль' type='password' />
                    )} control={control} name="password" rules={{ required: "Заполните поле" }} />

                </DialogContent>

                <DialogActions>
                    <Button disabled={loading || !authDialogOpen} onClick={() => setAuthDialogOpen(false)} color='error'>Отмена</Button>
                    <Button disabled={loading || !authDialogOpen} type='submit'>Войти</Button>
                </DialogActions>

            </form>

        </Dialog>

    </>
}

export default AuthDialog