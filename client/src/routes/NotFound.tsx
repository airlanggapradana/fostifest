import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Home, Search, ArrowLeft, HelpCircle} from 'lucide-react';
import {useNavigate} from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-teal-300 to-emerald-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      {/* Main container with fade-in animation */}
      <div className="w-full max-w-2xl mx-auto animate-in fade-in-50 duration-1000">

        {/* Main card container */}
        <Card className={"bg-transparent border-none shadow-none"}>
          <CardContent className="p-8 md:p-12 text-center">

            {/* 404 Number with bounce animation */}
            <div className="mb-8">
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br from-teal-400 to-gray-800 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent animate-in slide-in-from-top-4 duration-1000 delay-200"
                aria-label="Error 404"
              >
                404
              </h1>

              {/* Animated underline */}
              <div
                className="w-24 h-1 bg-gradient-to-r from-teal-200 to-emerald-400 mx-auto rounded-full animate-in slide-in-from-left-4 duration-1000 delay-500"></div>
            </div>

            {/* Error icon with gentle pulse */}
            <div className="mb-6 animate-in zoom-in-50 duration-1000 delay-300">
              <div
                className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse">
                <Search className="w-8 h-8 text-slate-500 dark:text-slate-400"/>
              </div>
            </div>

            {/* Main heading with slide-in animation */}
            <h2
              className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4 animate-in slide-in-from-right-4 duration-1000 delay-400">
              Oops! Page Not Found
            </h2>

            {/* Description with fade-in delay */}
            <p
              className="text-slate-200 dark:text-slate-300 text-lg leading-relaxed mb-8 animate-in fade-in-0 duration-1000 delay-600">
              The page you're looking for seems to have wandered off into the digital wilderness.
              Don't worry though – even the best explorers sometimes take a wrong turn.
            </p>

            {/* Helpful suggestions with staggered animations */}
            <div className="mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
              <div
                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-4 py-2 rounded-full">
                <HelpCircle className="w-4 h-4"/>
                <span>Try checking the URL or return to safety</span>
              </div>
            </div>

            {/* Action buttons with hover animations */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-800">

              {/* Primary CTA - Go Home */}
              <Button
                onClick={handleGoHome}
                size="lg"
                className="group bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                aria-label="Return to homepage"
              >
                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"/>
                Go Back Home
              </Button>

              {/* Secondary CTA - Go Back */}
              <Button
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                className="group border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"/>
                Go Back
              </Button>
            </div>

            {/* Footer text with final fade-in */}
            <p
              className="text-xs text-slate-200 dark:text-slate-500 mt-8 animate-in fade-in-0 duration-1000 delay-1000">
              Error Code: 404 • Page Not Found
            </p>
          </CardContent>
        </Card>

        {/* Decorative elements with floating animation */}
        <div
          className="absolute top-10 left-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-60 animate-bounce"
          style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div
          className="absolute top-32 right-16 w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-40 animate-bounce"
          style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div
          className="absolute bottom-20 left-20 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full opacity-50 animate-bounce"
          style={{animationDelay: '2s', animationDuration: '5s'}}></div>
      </div>
    </div>
  );
}

export default NotFoundPage;