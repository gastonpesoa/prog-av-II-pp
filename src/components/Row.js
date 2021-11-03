import React from 'react'
import { Link } from 'react-router-dom';

const Row = ({ mascota, setMascotaEdit, borrarMascota }) => {
    const { id, nombre, tipo } = mascota;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
                <button
                    onClick={() => {
                        setMascotaEdit(mascota)
                    }}
                >
                    Modificar
                </button>
                <button
                    onClick={() => { borrarMascota(id) }}
                >
                    Eliminar
                </button>
                <Link to={`mascota/${id}`}>
                    <button>
                        Detalle
                    </button>
                </Link>
            </td>
        </tr>
    )
}

export default Row
