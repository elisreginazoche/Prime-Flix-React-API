import { useEffect, useState } from 'react';
import api from '../../services/api'
//useEffect => toda a vez que abrir a aplicação, os filmes serao requisitados da API
//useState => depois que buscar, irá ser armazenado em algum estado para ser utilizado na apilicação
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadMovies() {
      //o await é para esperar a requisição para poder passar para a linha de baixo
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: 'ff1152fc663e0f0998d4f21dd03eaa4c',
          language: 'pt-BR',
          page: 1
        }
      })
      //console.log(response.data.results.slice(0, 10));
      setMovies(response.data.results.slice(0, 10))
      setLoading(false);
    }
    loadMovies();


  }, [])


  if (loading) {
    return (
      <div>
        <h2 className='loading'>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='list-movies'>
        {movies.map((item) => {
          return (
            <article key={item.id}>
              < strong > {item.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
              <Link to={`/movie/${item.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div >
    </div >
  )
}


export default Home;