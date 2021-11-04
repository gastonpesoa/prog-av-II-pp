import React, { useEffect, useState } from 'react'
import Select from './Select';

const initialForm = {
    id: null,
    nombre: "",
    edad: 0,
    tipo: "default",
    vacunado: false,
    observaciones: ""
}

const Form = ({ crearMascota, modificarMascota, mascotaEdit, setMascotaEdit }) => {

    const [form, setForm] = useState(initialForm)
    const { id, nombre, edad, tipo, vacunado, observaciones } = form;
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (mascotaEdit) {
            setChecked(mascotaEdit.vacunado)
            setForm(mascotaEdit);
        }
    }, [mascotaEdit])

    const handledCheck = () => {
        setChecked(!checked)
        setForm((form) => {
            return {
                ...form,
                vacunado: !checked
            }
        })
    }

    const handledSelectChange = (e) => {
        setForm((form) => {
            return {
                ...form,
                tipo: e
            }
        })
    }

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
        if (!nombre || !edad || tipo == "default") {
            alert("Faltan datos")
            return;
        }
        if (id) {
            modificarMascota(form)
        } else {
            crearMascota(form)
        }
        handledReset();
    }

    const handledReset = (e) => {
        setForm(initialForm);
        setMascotaEdit(null);
    }

    return (
        <>
            <h2>{id ? "Modificar Mascota" : "Agregar Mascota"}</h2>
            <form onSubmit={handledSubmit}>
                <p>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="nombre"
                        autoComplete="false"
                        value={nombre}
                        onChange={handledChange}
                    />
                </p>
                <p>
                    <input
                        type="number"
                        name="edad"
                        placeholder="edad"
                        autoComplete="false"
                        value={edad}
                        onChange={handledChange}
                    />
                </p>
                <p>
                    <Select
                        name="tipo"
                        value={tipo}
                        onSelectChange={handledSelectChange}
                    />
                </p>
                <p>
                    <label>Vacunado?: </label>
                    <input
                        name="vacunado"
                        type="checkbox"
                        checked={vacunado}
                        onChange={handledCheck}
                    />
                </p>
                <p>
                    <textarea
                        name="observaciones"
                        type="text"
                        placeholder="observaciones"
                        value={observaciones}
                        onChange={handledChange}
                    />
                </p>
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
