import React from 'react'
import { Link } from 'react-router-dom';

const Row = ({ mascota, setMascotaEdit, borrarMascota }) => {
    const { id, nombre, tipo } = mascota;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
                <Link to={`mascota/${id}`}>
                    <button
                        class="button is-success mr-2"
                    >
                        Detalle
                    </button>
                </Link>
                <button
                    class="button is-warning mr-2"
                    onClick={() => {
                        setMascotaEdit(mascota)
                    }}
                >
                    Modificar
                </button>
                <button
                    class="button is-danger"
                    onClick={() => { borrarMascota(id) }}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Row
