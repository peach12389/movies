import React from "react";

export class ErrorBoundary extends React.Component {
  state = {
    error: false,
    message: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(_error: any) {
    return { error: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      message: JSON.stringify(error, null, 2),
      errorInfo: JSON.stringify(errorInfo, null, 2),
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-10">
          <p className="text-lg">Oops, Something Went Wrong</p>
          <p>
            The app ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press
            the button below to restart the app and sign back in. Please contact us if this issue persists.
          </p>
          <div>
            <p>{this.state.errorInfo}</p>
            <p>{this.state.message}</p>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
