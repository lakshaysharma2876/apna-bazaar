import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    await addToCart(product.id.toString());
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Low Stock
          </span>
        )}
        {product.stock_quantity === 0 && (
          <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex-grow p-4">
        <div className="space-y-2">
          {product.category_name && (
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {product.category_name}
            </span>
          )}
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Stock: {product.stock_quantity}
          </p>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={!user || product.stock_quantity === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {!user
            ? 'Sign in to purchase'
            : product.stock_quantity === 0
            ? 'Out of Stock'
            : 'Add to Cart'
          }
        </button>
      </div>
    </div>
  );
};

export default ProductCard;