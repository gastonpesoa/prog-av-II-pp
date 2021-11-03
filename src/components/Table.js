import React from 'react'
import Row from './Row'

const Table = ({ data, setMovieEdit, deleteMovie }) => {
    return (<>
        <h2>Movies List</h2>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Genero</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.length
                    ? (data.map(movie => (
                        <Row
                            key={movie.id}
                            movie={movie}
                            setMovieEdit={setMovieEdit}
                            deleteMovie={deleteMovie}
                        />)))
                    : <tr><td colSpan={3}>No hay datos</td></tr> }
            </tbody>
        </table>
    </>
    )
}

export default Table
