import PropTypes from 'prop-types'
import slug from 'slug'
import Dialog from '@mui/material/Dialog'
import { Link } from 'react-router-dom'

export function Notification({ recipe, dismissNotification }) {
  return (
    <div>
          <Dialog 
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}>
            <Link to={`/recipes/${recipe._id}/${slug(recipe.title)}`}>
              <h3>Click here to see the new recipe: {recipe.title}</h3>
            </Link>
            <button onClick={() => dismissNotification()}>Close window</button>
          </Dialog>
    </div>
  )
}
Notification.propTypes = {
  recipe: PropTypes.object.isRequired,
}
