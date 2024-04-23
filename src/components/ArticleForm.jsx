import { Stack, Typography, Divider, TextField, Button, Box, FormControl, Skeleton, FormControlLabel, Switch } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getCookie, trapSpacesForRequiredFields } from "../utils";
import ArticleTop from "./ArticleTop";
import { CheckBox } from "@mui/icons-material";
import AuthContext from "../context/AuthContext";

const ArticleForm = ({ loading = true, article, mode, onApplied, onDeleted }) => {

    useEffect(() => {
        if (article == null) return

        setValue("label", article.label, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
        setValue("content", article.content, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
        setValue("tags", article.tags, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
        setValue("hidden", article.hidden, { shouldValidate: true, shouldDirty: true, shouldTouch: true })

        file.current = null

    }, [article])

    const [imageName, setImageName] = useState("")
    const file = useRef()

    const [applying, setApplying] = useState(false)

    const {authData} = useContext(AuthContext)

    const onImageSelect = (e) => {
        file.current = e.target.files[0]

        var name = e.target.files[0].name
        if (name.length > 20) name = name.substring(0, 20) + "..."
        setImageName(name)
    }

    const onAccept = ({ label, content, tags, hidden }) => {
        let formData = new FormData()

        const token = getCookie("csrftoken")

        formData.append('label', label)
        formData.append('content', content)
        formData.append('tags', tags)
        formData.append('hidden', hidden)
        formData.append('csrfmiddlewaretoken', token)
        if (file.current != null) formData.append('image', file.current);

        var options = {
            method: "POST",
            body: formData,
            ccredentials: "include",
            // headers: {'X-CSRFToken': token}
        }

        setApplying(true)

        if (mode == 'create') {
            fetch("api/articles/create", options).
                then(res => res.json()).
                then(data => {
                    enqueueSnackbar("Статья создана", { variant: "success" })
                    onApplied(data)
                }).
                catch(err => {
                    enqueueSnackbar("Ошибка создания статьи", { variant: "error" })
                }).finally(() => setApplying(false))

        } else if (mode == 'edit') {
            fetch("api/articles/update/" + article.pk, options).
                then(res => res.json()).
                then(data => {
                    enqueueSnackbar("Статья отредактирована", { variant: "success" })
                    onApplied(data)
                }).
                catch(err => {
                    enqueueSnackbar("Ошибка редактирования статьи", { variant: "error" })
                }).finally(() => setApplying(false))

        }
    }

    const onDelete = () => {
        let formData = new FormData()
        formData.append('csrfmiddlewaretoken', getCookie("csrftoken"))

        var options = { method: "POST", body: formData, ccredentials: "include" }

        setApplying(true)

        fetch("api/articles/delete/" + article.pk, options).
            then(data => { enqueueSnackbar("Статья удалена", { variant: "success" }); onDeleted() }).
            catch(err => { enqueueSnackbar("Ошибка удаления статьи", { variant: "error" }) }).
            finally(() => setApplying(false))
    }

    const { register, control, handleSubmit, setValue, formState } = useForm({ defaultValues: { label: "", content: "", tags: "", hidden: false } })

    return <>

        {mode == 'edit' &&
            <ArticleTop loading={loading} article={article} />
        }

        <form noValidate onSubmit={handleSubmit((data) => onAccept(data))}>

            <Controller render={({ field: { onChange, onBlur, value } }) => (
                <TextField error={!!formState.errors.label} helperText={formState.errors.label?.message}
                    disabled={loading || applying} onBlur={onBlur} onChange={onChange} value={value}
                    fullWidth margin='dense' size='small' label='Название' />
            )} control={control} name="label" rules={{ required: "Заполните поле", validate: trapSpacesForRequiredFields }} />

            <Controller render={({ field: { onChange, onBlur, value } }) => (
                <TextField error={!!formState.errors.content} helperText={formState.errors.content?.message}
                    disabled={loading || applying} onBlur={onBlur} onChange={onChange} value={value}
                    minRows={15} multiline fullWidth margin='dense' size='small' label='Текст' />
            )} control={control} name="content" rules={{ required: "Заполните поле", validate: trapSpacesForRequiredFields }} />

            <Controller render={({ field: { onChange, onBlur, value } }) => (
                <TextField error={!!formState.errors.tags} helperText={formState.errors.tags?.message}
                    disabled={loading || applying} onBlur={onBlur} onChange={onChange} value={value}
                    fullWidth margin='dense' size='small' label='Теги' />
            )} control={control} name="tags" rules={{ required: "Заполните поле", validate: trapSpacesForRequiredFields }} />

            {/* <TextField error={!!formState.errors.label} {...register("label", { required: true })} fullWidth margin='dense' size='small' label='Название' />
            <TextField error={!!formState.errors.content} {...register("content", { required: true })} minRows={15} multiline fullWidth margin='dense' size='small' label='Текст' />
            <TextField error={!!formState.errors.tags} {...register("tags", { required: true })} fullWidth margin='dense' size='small' label='Теги' /> */}

            {/* <FormControlLabel control={<CheckBox />} label="Label" /> */}

            {mode=='edit' && <Controller
                render={({ field: { onChange, onBlur, value } }) => <FormControlLabel control={<Switch onBlur={onBlur} onChange={onChange} checked={value} />} label="Скрыть" />}
                control={control}
                name="hidden"
            />}



            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={4}>

                {mode == 'edit' && <Button onClick={onDelete} disabled={loading || applying} component="label" variant='contained' color='error'>Удалить</Button>}
                <Button disabled={loading || applying} component="label" variant='outlined' sx={{ wordWrap: '' }}> {imageName.length > 0 ? imageName : 'Прикрепить изображение'} <input onChange={onImageSelect} accept="image/*" type='file' hidden /></Button>
                <Box flex={1} sx={{ display: { xs: 'none', md: 'block' } }} />
                {/* <Button onClick={onAccept} component="label" variant='contained' color='success'>{mode == 'edit' ? 'Применить' : 'Опубликовать'}</Button> */}

                <Button disabled={loading || applying} type='submit' variant='contained' color='primary'>{mode == 'edit' ? 'Применить' : 'Опубликовать'}</Button>

            </Stack>

        </form>


    </>
}

export default ArticleForm