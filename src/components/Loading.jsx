/**
 * Displays a centered loading spinner with a status label.
 */
function Loading({ message = 'Discovering movies...' }) {
  return (
    <div className="status-message" role="status" aria-live="polite">
      <div className="loader" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  )
}

export default Loading
