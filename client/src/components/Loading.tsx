import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {Loader2} from 'lucide-react';

interface LoadingPageProps {
  /**
   * Custom loading text to display
   * @default "Loading..."
   */
  showProgress?: boolean;
  /**
   * Progress value (0-100) when showProgress is true
   * @default undefined
   */
  progress?: number;
  /**
   * Additional CSS classes for customization
   */
  className?: string;
  /**
   * Size of the loading spinner
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
}

const LoadingPage: React.FC<LoadingPageProps> = ({
                                                   showProgress = false,
                                                   progress,
                                                   className,
                                                   size = "default"
                                                 }) => {
  const spinnerSizes = {
    sm: "h-6 w-6",
    default: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const textSizes = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg"
  };

  const loadingText = [
    'We are preparing something from the kitchen...',
    'Fetching data...',
    'Preparing the stage...',
    'Getting things ready...',
    'Mixing up some magic...',
    'Loading your experience...',
    'Brewing fresh content...',
    'Almost there, hang tight!',
    'Warming up the engines...',
    'Just a moment, making things awesome...'
  ];

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center bg-gray-950 p-4",
        "animate-in fade-in-0 duration-500",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={loadingText[Math.floor(Math.random() * loadingText.length)]}
    >
      <Card className="w-full max-w-md bg-gray-800 border-2 border-teal-500">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
          {/* Loading Spinner */}
          <div className="relative">
            <Loader2
              className={cn(
                "animate-spin text-emerald-300",
                spinnerSizes[size]
              )}
              aria-hidden="true"
            />

            {/* Pulse ring animation */}
            <div
              className={cn(
                "absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping",
                spinnerSizes[size]
              )}
              aria-hidden="true"
            />
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <h2
              className={cn(
                "font-medium text-gray-100",
                textSizes[size]
              )}
            >
              {loadingText[Math.floor(Math.random() * loadingText.length)]}
            </h2>

            <p className="text-sm text-gray-300">
              Please wait while we prepare things for you
            </p>
          </div>

          {/* Progress Bar (Optional) */}
          {showProgress && (
            <div className="w-full space-y-2">
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                  style={{
                    width: progress !== undefined ? `${Math.min(Math.max(progress, 0), 100)}%` : '0%'
                  }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Loading progress: ${progress || 0}%`}
                />
              </div>

              {progress !== undefined && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              )}
            </div>
          )}

          {/* Loading dots animation */}
          <div className="flex space-x-1" aria-hidden="true">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingPage;