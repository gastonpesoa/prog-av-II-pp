import React, { useEffect, useState } from 'react'
//import { movies } from '../data/data';

const initialForm = {
    id: null,
    titulo: "",
    genero: ""
}

const Form = ({ createMovie, updateMovie, movieEdit, setMovieEdit }) => {

    const [form, setForm] = useState(initialForm)
    const { id, titulo, genero } = form;

    useEffect(() => {
        if (movieEdit) {
            setForm(movieEdit);
        }
    }, [movieEdit])

    const handledChange = (e) => {
        setForm((form) => {
            return {
                ...form,
                [e.target.name]: e.target.value
            }
        })
    }

    const handledSubmit = (e) => {
        e.preventDefault();
        if (!titulo || !genero) {
            alert("Faltan datos")
            return;
        }
        if (id) {
            updateMovie(form)
        } else {
            createMovie(form)
        }
        handledReset();
    }

    const handledReset = (e) => {
        setForm(initialForm);
        setMovieEdit(null);
    }

    return (
        <>
            <h2>{id ? "Update Movie" : "Add Movie"}</h2>
            <form onSubmit={handledSubmit}>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Titulo"
                    autoComplete="false"
                    value={titulo}
                    onChange={handledChange}
                />
                <input
                    type="text"
                    name="genero"
                    placeholder="Genero"
                    autoComplete="false"
                    value={genero}
                    onChange={handledChange}
                />
                <input
                    type="submit"
                    value="Enviar"
                />
                <input
                    type="reset"
                    value="Limpiar"
                    onClick={handledReset}
                />
            </form>
        </>
    )
}

export default Form
