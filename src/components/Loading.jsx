export default function Loading({ message = 'Memuat film...' }) {
  return (
    <div className="status-message">
      <div className="loader"></div>
      <p>{message}</p>
    </div>
  )
}
