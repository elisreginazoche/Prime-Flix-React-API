import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './movie.css'

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadMovie() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'ff1152fc663e0f0998d4f21dd03eaa4c',
          language: 'pt-BR',
        }

      }).then((response) => {
        setMovie(response.data)
        setLoading(false)
      }).catch(() => {
        console.log('Filme não encontrado')
        navigate("/", { replace: true })
        return
      })
    }
    loadMovie()

    return () => {
      console.log('COMPONENTE FOI DESMONTADO')
    }
  }, [navigate, id])
  //navigate e id são as dependencias do useEffect (parametros dele)


  function saveMovie() {
    const myList = localStorage.getItem('@primeflix');
    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some((listItem) => listItem.id === movie.id)
    if (hasMovie) {
      alert('Esse filme já está salvo na sua lista!')
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem('@primeflix', JSON.stringify(savedMovies))
    alert('Filme Salvo com Sucesso!')
  }


  if (loading) {
    return (
      <div className='movie-info'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='movie-info'>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average}/10</strong>

      <div className='buttons'>
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a target='black' rel='external' href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>Trailer</a>
        </button>
      </div>
    </div >
  )
}

export default Movie;