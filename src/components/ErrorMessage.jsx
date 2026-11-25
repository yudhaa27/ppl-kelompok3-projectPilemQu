function ErrorMessage({
  message = 'Terjadi kesalahan saat memuat data.',
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
              className="button-secondary status-button"
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
