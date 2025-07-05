import React from 'react';

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Caught in ErrorBoundary", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 20 }}>❌ App crashed: {String(this.state.error)}</div>;
    }

    return this.props.children;
  }
}
