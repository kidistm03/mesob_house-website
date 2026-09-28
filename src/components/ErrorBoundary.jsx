import { Component } from "react";

// Class component is required for Error Boundaries (React limitation)
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // React calls this when a child throws
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Optional: log the error somewhere
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <p className="text-5xl mb-4">😕</p>
          <h1 className="text-2xl font-serif mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-maroon text-white font-semibold px-5 py-3 rounded-lg"
          >
            Refresh page
          </button>
        </div>
      );
    }

    // No error → render children normally
    return this.props.children;
  }
}