import React, { useEffect, useState } from 'react'
import Form from './Form'
import Loader from './Loader'
import Table from './Table'

const URL = "http://localhost:5000/movies/";

const Crud = () => {

    const [movies, setMovies] = useState([])
    const [movieEdit, setMovieEdit] = useState(null)
    const [loading, setloading] = useState(false)


    useEffect(() => {
        const getMovies = async (url) => {
            setloading(true);
            try {
                const res = await fetch(url);
                const data = await res.json();
                data.forEach((movie) => {
                    setMovies((movies) => {
                        return [...movies, movie]
                    })
                })
                setloading(false);
            } catch (error) {

            }
        }
        getMovies(URL)
    }, [])

    const createMovie = (newMovie) => {
        //console.log(newMovie)
        // newMovie.id = Date.now();
        setloading(true);
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then(movie => {
                setMovies(movies => [...movies, movie])
            })
            .finally(() => {
                alert("Alta Okey!")
                setloading(false);
            })
    }

    const updateMovie = (movieToUpdate) => {
        setloading(true);
        fetch(URL + movieToUpdate.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movieToUpdate)
        })
            .then(res => res.json())
            .then(movieUpdated => {
                setMovies((movies) => {
                    return movies.map((movie) =>
                        movie.id === movieUpdated.id ? movieUpdated : movie
                    )
                })
            })
            .finally(() => {
                alert("Modificacion Okey!")
                setloading(false);
            })
    }

    const deleteMovie = (id) => {
        if (window.confirm("Confirma eliminacion de " + id)) {
            setloading(true);
            fetch(URL + id, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        setMovies((movies) => {
                            return movies.filter(movie => movie.id !== id)
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
                createMovie={createMovie}
                updateMovie={updateMovie}
                setMovieEdit={setMovieEdit}
                movieEdit={movieEdit}
            />
            {
                loading
                    ? (<Loader />)
                    : (<Table
                        data={movies}
                        setMovieEdit={setMovieEdit}
                        deleteMovie={deleteMovie}
                    />)
            }
        </section>
    )
}

export default Crud
