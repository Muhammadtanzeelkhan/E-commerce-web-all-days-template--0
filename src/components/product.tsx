import React from 'react';
import ProductItem from './productitem';
import { useCartContext } from "@/app/cardcontext/page";

interface Relation {
  category: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  discountPercentage?: number;
}

interface ProductsProps {
  relation: Relation;
}

const Products: React.FC<ProductsProps> = ({ relation }) => {
  const { data = [] } = useCartContext(); // Default to an empty array if data is undefined

  // Filter related products based on category and exclude the current product
  const relatedProducts = data.filter(
    (item: Product) =>
      item.category === relation.category && item.name !== relation.name
  );

  // If no related products exist, fallback to all products
  const ifRelatedExistsOrNot = relatedProducts.length > 0 ? relatedProducts : data;

  if (ifRelatedExistsOrNot.length === 0) {
    return <p>No related products available.</p>;
  }

  return (
    <div className="flex gap-4 flex-wrap mt-3 md:mt-[2.8rem] items-center justify-center">
      {ifRelatedExistsOrNot.map((value: Product) => {
        return <ProductItem key={value.id} index={parseInt(value.id)} item={value} />;
      })}
    </div>
  );
};

export default Products;
