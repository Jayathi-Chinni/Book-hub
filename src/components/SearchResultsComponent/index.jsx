import './index.css'
import BookItem from '../BookItem'

const SearchResults = props => {
  const {books} = props

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h1 className="search-results-heading">Search Results</h1>

        <p className="search-results-count">{books.length} Books</p>
      </div>

      <div className="search-results-list">
        {books.map(eachBook => (
          <BookItem key={eachBook.id} book={eachBook} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
