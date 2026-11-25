function Loading({ message = 'Memuat data...' }) {
  return (
    <div className="status-message" role="status" aria-live="polite">
      <div className="loader" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  )
}

export default Loading
