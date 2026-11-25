/**
 * Displays an error state with an optional retry action and extra actions.
 */
function ErrorMessage({
  message = 'Gagal memuat data film.',
  onRetry,
  retryLabel = 'Coba Lagi',
  children,
}) {
  return (
    <div className="status-message error" role="alert">
      <p>{message}</p>
      {(onRetry || children) && (
        <div className="status-actions">
          {onRetry && (
            <button
              type="button"
              className="button-secondary retry-button status-button"
              onClick={onRetry}
            >
              {retryLabel}
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  )
}

export default ErrorMessage
