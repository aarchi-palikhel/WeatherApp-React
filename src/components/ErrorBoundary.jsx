import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500/80 text-white rounded-lg p-4 text-center">
          <p className="font-bold mb-2">⚠️ Something went wrong</p>
          <p className="text-sm mb-3">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded font-semibold"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;