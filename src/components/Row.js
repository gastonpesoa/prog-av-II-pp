import React from 'react'

const Row = ({ movie, setMovieEdit, deleteMovie }) => {
    const { id, titulo, genero } = movie;
    return (
        <tr>
            <td>{titulo}</td>
            <td>{genero}</td>
            <td>
                <button
                    onClick={() => {
                        setMovieEdit(movie)
                    }}
                >
                    Update
                </button>
                <button
                    onClick={() => { deleteMovie(id) }}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default Row
