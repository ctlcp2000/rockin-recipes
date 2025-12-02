import PropTypes from 'prop-types'
export function Notification({ recipe, dismissNotification }) {
  return (
    <div>
      {recipe}
    </div>
  )
}
Notification.propTypes = {
  recipe: PropTypes.string.isRequired,
}
