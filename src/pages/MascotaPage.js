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
        <section className="section">
            <div className="container">
                <Link to="/"><button class="button is-rounded">Volver</button></Link>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4"> {nombre}</p>
                                <p className="subtitle is-6">Edad: {edad}</p>
                                <p className="subtitle is-6">{tipo}</p>
                                <p className="subtitle is-6">Vacunado: {vacunado ? "SI" : "NO"}</p>
                            </div>
                        </div>

                        <div className="content">
                            {observaciones}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MascotaPage
