import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load users.");
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch(() => setError("Unable to load users. Check your internet connection and refresh."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <header className="hero">
        <p className="eyebrow">REACT + API</p>
        <h1>Users Directory</h1>
        <p>Example user data loaded from a public API.</p>
      </header>

      {loading && <p className="status">Loading users...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="count">Showing {users.length} users</p>
          <section className="user-grid">
            {users.map((user) => (
              <article className="user-card" key={user.id}>
                <div className="avatar">{user.name.charAt(0)}</div>
                <div>
                  <h2>{user.name}</h2>
                  <p className="email">{user.email}</p>
                  <p>{user.company.name}</p>
                  <p className="website">{user.website}</p>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
      <footer>Built with React and Vite</footer>
    </main>
  );
}