import {Component, ErrorInfo, ReactNode} from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

/**
 * Catches render-time errors (including failed lazy-chunk loads) so a single
 * broken section can't blank the entire page.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {hasError: false};

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Uncaught error in component tree:', error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div
                    role="alert"
                    style={{
                        minHeight: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'rgba(255,255,255,0.87)',
                        backgroundColor: '#111827',
                    }}
                >
                    <h1 style={{fontSize: '1.75rem', margin: 0}}>Something went wrong.</h1>
                    <p style={{opacity: 0.8, margin: 0}}>
                        A part of the page failed to load. Please try again.
                    </p>
                    <button
                        type="button"
                        onClick={this.handleReload}
                        style={{
                            padding: '0.6rem 1.4rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'transparent',
                            color: 'inherit',
                            cursor: 'pointer',
                        }}
                    >
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
