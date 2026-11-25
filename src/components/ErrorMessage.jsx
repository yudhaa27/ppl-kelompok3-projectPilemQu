/**
 * Displays an error state with an optional retry action.
 */
function ErrorMessage({ message = 'Gagal memuat data film.', onRetry }) {
  return (
    <div className="status-message error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="button-secondary retry-button" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
