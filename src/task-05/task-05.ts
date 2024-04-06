import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const { query = '', genre = [], orderBy = 'title', direction = 'ASC', limit = 12, offset = 0 } = params;

  let catalog: Movie[] = [];
  try {
    catalog = await MovieService.getMovies();
  } catch (error) {
    console.error('Failed to load movie catalog:', error);
    return { total: 0, movies: [] };
  }

  const searchQuery = query.toLowerCase();
  const matchesCriteria = (film: Movie) => {
    const titleMatch = film.title.toLowerCase().includes(searchQuery);
    const overviewMatch = film.overview.toLowerCase().includes(searchQuery);
    const genreMatch = genre.length ? genre.some(g => film.genres?.includes(g)) : true;
    return (titleMatch || overviewMatch) && genreMatch;
  };

  let resultMovies = catalog.filter(matchesCriteria);

  const compareFunc = (a: Movie, b: Movie) => {
    if (orderBy === 'title') {
      return a.title.localeCompare(b.title) * (direction === 'ASC' ? 1 : -1);
    } else if (orderBy === 'release_date') {
      return (new Date(a.release_date) > new Date(b.release_date) ? 1 : -1) * (direction === 'ASC' ? 1 : -1);
    } else {
      const aValue = a[orderBy as keyof Movie] || 0; 
      const bValue = b[orderBy as keyof Movie] || 0; 
      return aValue === bValue ? 0 : (aValue > bValue ? 1 : -1) * (direction === 'ASC' ? 1 : -1);
    }
  };

  resultMovies.sort(compareFunc);

  const pageResults = resultMovies.slice(offset, offset + limit);

  return { total: resultMovies.length, movies: pageResults };
};
