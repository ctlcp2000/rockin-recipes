import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, contents, author, imageUrl }) {
  if (imageUrl != null && imageUrl != '') {
    return (
      <article>
        <h3>{title}</h3>
        <img src={imageUrl} alt={title} />
        <div>{contents}</div>

        {author && (
          <em>
            <br />
            Written by <User id={author} />
          </em>
        )}
      </article>
    )
  } else {
    return (
      <article>
        <h3>{title}</h3>
        <div>{contents}</div>

        {author && (
          <em>
            <br />
            Written by <User id={author} />
          </em>
        )}
      </article>
    )
  }
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
}
