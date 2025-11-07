import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLike } from '../api/recipes.js'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { jwtDecode } from 'jwt-decode'
import slug from 'slug'
import { Link } from 'react-router-dom'


export function Recipe({_id, title, contents, author, imageUrl, likes }) {
  const [likingUserId, setLikes] = useState('')
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const likeRecipeMutation = useMutation({
    mutationFn: () => toggleLike(token, { _id, likingUserId} ),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    likeRecipeMutation.mutate()
  }

    return (
      <article>
        {/* <div>{token.user.id}</div> */}
        <Link to={`/recipes/${_id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
        {imageUrl != null && imageUrl != '' ? <img src={imageUrl} alt={title} /> : ""}
        <div>{contents}</div>

        {author && (
          <em>
            <br />
            Written by <User id={author} />
          </em>
        )}
        {likes && (
          <em>
            <br />
            <div>Likes: {likes.length}</div>
                <form onSubmit={handleSubmit}>
                    <button type="submit" disabled={!token} onClick={() => setLikes(jwtDecode(token).sub)}>{likes.includes(author) ? 'Remove Like' : 'Like'}</button>
                </form>
          </em>
        )}
      </article>
    )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  likes: PropTypes.array,
  _id: PropTypes.string
}
