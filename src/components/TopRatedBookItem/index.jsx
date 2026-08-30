import './index.css'

const TopRatedBookItem = props => {
  const {book} = props

  return (
    <div className="top-rated-book-item">
      <img src={book.cover_pic} alt="book cover" className="book-cover" />

      <h1 className="book-title">{book.title}</h1>

      <p className="book-author">{book.author_name}</p>
    </div>
  )
}

export default TopRatedBookItem
