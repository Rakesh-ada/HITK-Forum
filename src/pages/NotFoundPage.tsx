import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { RedditLogo } from "../components/ui/RedditLogo";

export const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <RedditLogo className="h-24 w-24 mx-auto text-orange-500 mb-6" />
      
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
        <Link to="/">
          <Button variant="primary">
            Back to Home
          </Button>
        </Link>
        
        <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            Go to Reddit
          </Button>
        </a>
      </div>
    </div>
  );
};