import { useState } from "react";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJokes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/randomjokes?limit=15&t=${Date.now()}`
      );
      const data = await res.json();
      setJokes(data?.data?.data || []);
      
      // Smooth scroll to jokes after loading
      if(jokes.length === 0) {
        setTimeout(() => {
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      <div className="bg-gradient"></div>
      
      <div className="container">
        <header className="header">
          <div className="badge">ON-DEMAND HUMOR</div>
          <h1 className="logo">
            Laughter<span className="accent">Hub</span>
          </h1>
          <p className="tagline">Premium unfiltered humor. Press the button to start.</p>
          
          <button 
            onClick={getJokes} 
            className="sync-btn"
            disabled={loading}
          >
            {loading ? "Brewing 15 Jokes..." : "Generate 15 Jokes"}
          </button>
        </header>

        <main className={`grid-container ${loading ? "loading-state" : ""}`}>
          {jokes.length > 0 ? (
            <>
              <div className="grid">
                {jokes.map((item, index) => (
                  <div key={index} className="joke-card">
                    <div className="card-header">
                      <span className="joke-id">#{index + 1}</span>
                      <div className="status-dot"></div>
                    </div>
                    <p className="joke-content">{item.content}</p>
                    <div className="card-footer">
                      <span className="tag">STRICTLY UNFILTERED</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <footer className="footer-end">
                <div className="end-divider"></div>
                <p>You've reached the end of the laughter.</p>
                <button onClick={scrollToTop} className="back-to-top">
                  Back to Top ↑
                </button>
              </footer>
            </>
          ) : (
            !loading && (
              <div className="empty-state">
                <p>The stage is empty. Click generate to begin.</p>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}

export default App;