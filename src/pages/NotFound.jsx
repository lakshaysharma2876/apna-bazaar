import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
