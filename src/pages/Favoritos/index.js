import './favoritos.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Favoritos() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem('@primeflix')
    setMovies(JSON.parse(myList) || [])

  }, []);

  function deleteMovie(id) {
    //Vou devolver todos os filmes menos o que eu estou clicando
    let filterMovies = movies.filter((item) => {
      return (item.id !== id)
    })
    setMovies(filterMovies);
    localStorage.setItem('@primeflix', JSON.stringify(filterMovies))
  }


  return (
    <div className='my-movies'>
      <h1>Meus Filmes</h1>
      {movies.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <spam>{item.title}</spam>
              <div>
                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Favoritos