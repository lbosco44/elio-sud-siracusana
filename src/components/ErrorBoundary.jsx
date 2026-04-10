import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    if (typeof window !== 'undefined') {
      window.__REACT_ERROR__ = {
        msg: error?.message,
        stack: error?.stack,
        componentStack: info?.componentStack,
      };
    }
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const { error, info } = this.state;
    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          padding: '2rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          background: '#FAF8F4',
          color: '#1C1C1E',
        }}
      >
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
          Qualcosa è andato storto
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          {error?.message || 'Errore sconosciuto'}
        </p>
        <details style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
          <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
            Dettagli tecnici
          </summary>
          <pre
            style={{
              background: '#fff',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              maxWidth: '100%',
            }}
          >
            {error?.stack}
            {'\n\n'}
            {info?.componentStack}
          </pre>
        </details>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            background: '#E8671A',
            color: '#fff',
            border: 0,
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Ricarica pagina
        </button>
      </div>
    );
  }
}
