import { useState } from "react";
import Fetcher from "../Fetcher";
import Spinner from "../Spinner";

export default function ShowTable() {
    const [films, setFilms] = useState(null);
    const [query, setQuery] = useState('');
    const [isSubmitted, setSubmitted] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!isSubmitted) {
            setSubmitted(true);
            setPage(1); // Сброс страницы при новом запросе
        } else {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="header">IMDb Movies Search</div>
            <hr />
            <div className='search-container'>
                <input
                    type="text"
                    id="search-box"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setSubmitted(false)//сброс поиска
                    }}
                    placeholder="Введите название фильма"
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = 'Введите название фильма'}
                />
                <button
                    className="search-button"
                    onClick={handleSearch}
                >
                    Поиск
                </button>
                <div className="search-page">
                    <span>Стр. {page}</span>
                </div>
            </div>
            <hr />
            {isSubmitted && (
                <Fetcher
                    url={`https://www.omdbapi.com/?apikey=ddc35b3b&s=${encodeURIComponent(query)}&page=${page}`}
                    setData={({ Search }) => {
                        setLoading(true); // Начинаем загрузку
                        if (Search) {
                            setFilms(Search.map(obj => Object.assign({}, obj, { id: obj.imdbID })));
                        } else {
                            setFilms([]);
                        }
                        setLoading(false); // Завершаем загрузку
                    }}
                >
                    <div id="result">
                        {isLoading && <Spinner />} {/* Показываем Spinner, когда данные загружаются */}
                        {films && films.length > 0 ? (
                            films.map((film) => (
                                <fieldset key={film.id}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ddd'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                                    <div className="film-info">
                                        <a href={`https://www.imdb.com/title/${film.imdbID}/`} target="_blank">
                                            <span><b>Title:</b> <span className="Title">{film.Title}</span></span>
                                        </a>
                                        <span><b>Year:</b> <span className="Year">{film.Year}</span></span>
                                        <span><b>Type:</b> <span className="Type">{film.Type}</span></span>
                                    </div>
                                    {film.Poster && <img className="Poster" src={film.Poster} alt={`Poster of ${film.Title}`} style={{ width: '100%' }} />}
                                </fieldset>
                            ))
                        ) : (
                            <div>Нет результатов</div>
                        )}
                        
                    </div>
                </Fetcher>
                // не смог понять как сделать ленту как в экзамене по js
            )}
        </div>
    );
}