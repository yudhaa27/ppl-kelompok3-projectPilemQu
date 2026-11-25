export default function ErrorMessage({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry,
}) {
  return (
    <div className="status-message error">
      <p>{message}</p>
      {onRetry && (
        <button
          type="button"
          className="button-secondary"
          onClick={onRetry}
          style={{ marginTop: '10px', cursor: 'pointer' }}
        >
          Coba Lagi <span>↺</span>
        </button>
      )}
    </div>
  )
}
