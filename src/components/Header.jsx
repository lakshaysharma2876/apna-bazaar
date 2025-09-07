import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Apna Bazaar
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/cart" className="relative">
                <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {totalItems > 0 && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Welcome, {user.fullName}</span>
                <button
                  onClick={signOut}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link to="/auth">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;