import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories?: {
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    await addToCart(product.id);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
          {product.stock_quantity < 10 && product.stock_quantity > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Low Stock
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <div className="space-y-2">
          {product.categories && (
            <Badge variant="outline" className="text-xs">
              {product.categories.name}
            </Badge>
          )}
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Stock: {product.stock_quantity}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!user || product.stock_quantity === 0}
          className="w-full"
        >
          {!user
            ? 'Sign in to purchase'
            : product.stock_quantity === 0
            ? 'Out of Stock'
            : 'Add to Cart'
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;