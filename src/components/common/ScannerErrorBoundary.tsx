import { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ShieldOff } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ScannerErrorBoundary extends Component<Props, State> {
  public props: Props;
  public state: State = {
    hasError: false,
    error: null,
  };
  public setState: any;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ScannerErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card rounded-3xl p-8 border border-red-500/30 bg-[#140a12]/90 text-center space-y-6 max-w-2xl mx-auto my-6 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <ShieldOff size={32} />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white font-mono">
              {this.props.fallbackTitle || 'Analysis View Protected'}
            </h3>
            <p className="text-xs text-red-300 font-mono max-w-md mx-auto leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering state occurred while displaying the AI analysis panel. The application remains safe.'}
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-white font-bold text-xs font-mono flex items-center gap-2 hover:brightness-110 transition-all shadow-lg cursor-pointer"
            >
              <RefreshCw size={16} />
              <span>Reset & Retry Scan</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
