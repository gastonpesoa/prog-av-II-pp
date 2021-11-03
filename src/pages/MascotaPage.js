import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

const MascotaPage = () => {

    const { id } = useParams();
    const [mascota, setMascota] = useState({})
    const { nombre, edad, tipo, vacunado, observaciones } = mascota;

    useEffect(() => {
        const URL = "http://localhost:5000/mascotas/";
        fetch(`${URL}/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject(res.status + ":" + res.statusText))
            .then(data => {
                console.log(data)
                setMascota(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    return (
        <div>
            <Link to="/">Volver</Link>
            <h1>Nombre: {nombre}</h1>
            <p>Edad: {edad}</p>
            <p>Tipo: {tipo}</p>
            <p>Vacunado: {vacunado ? "SI" : "NO"}</p>
            <p>Observaciones: {observaciones}</p>
        </div>
    )
}

export default MascotaPage
