import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, "Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line react/prop-types
      return this.props.fallback || <h1>Oops! Something went wrong.</h1>;
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
