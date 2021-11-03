import React, { useEffect, useState } from 'react'
import Form from './Form'
import Loader from './Loader'
import Table from './Table'

const URL = "http://localhost:5000/mascotas/";

const Crud = () => {

    const [mascotas, setMascotas] = useState([])
    const [mascotaEdit, setMascotaEdit] = useState(null)
    const [loading, setloading] = useState(false)


    useEffect(() => {
        const getMascotas = async (url) => {
            setloading(true);
            try {
                const res = await fetch(url);
                const data = await res.json();
                console.log("mascotas: ",data);
                setMascotas(data);
                setloading(false);
            } catch (error) {

            }
        }
        getMascotas(URL)
    }, [])

    const crearMascota = (nuevaMascota) => {
        nuevaMascota.id = Date.now();
        setloading(true);
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaMascota)
        })
            .then(res => res.json())
            .then(mascota => {
                setMascotas(mascotas => [...mascotas, mascota])
            })
            .finally(() => {
                alert("Alta Okey!")
                setloading(false);
            })
    }

    const modificarMascota = (mascotaAModificar) => {
        setloading(true);
        fetch(URL + mascotaAModificar.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mascotaAModificar)
        })
            .then(res => res.json())
            .then(movieUpdated => {
                setMascotas((mascotas) => {
                    return mascotas.map((movie) =>
                        movie.id === movieUpdated.id ? movieUpdated : movie
                    )
                })
            })
            .finally(() => {
                alert("Modificacion Okey!")
                setloading(false);
            })
    }

    const borrarMascota = (id) => {
        if (window.confirm("Confirma eliminacion de " + id)) {
            setloading(true);
            fetch(URL + id, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        setMascotas((mascotas) => {
                            return mascotas.filter(mascota => mascota.id !== id)
                        })
                    }
                })
                .finally(() => {
                    alert("Eliminado Okey!")
                    setloading(false);
                })
        }
    }

    return (
        <section>
            <Form
                crearMascota={crearMascota}
                modificarMascota={modificarMascota}
                setMascotaEdit={setMascotaEdit}
                mascotaEdit={mascotaEdit}
            />
            {
                loading
                    ? (<Loader />)
                    : (<Table
                        data={mascotas}
                        setMascotaEdit={setMascotaEdit}
                        borrarMascota={borrarMascota}
                    />)
            }
        </section>
    )
}

export default Crud
