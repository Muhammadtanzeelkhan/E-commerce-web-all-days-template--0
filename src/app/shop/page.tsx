'use client';
import React, { useState, ChangeEvent, useMemo } from 'react';
import WebsiteBanner from '@/components/website-banner';
import Gurantees from '@/components/gurantees';
import Pagination from '@/components/pagination';
import ProductItem from '@/components/productitem';
import { useCartContext } from '@/app/cardcontext/page';
import ShopPage from '@/components/shop-main';
// import ShopMain if it exists
import ShopMain from '@/components/shop-main';

// Define types for better clarity
interface Product {
  id: string;
  price: number;
  // Add other product properties as needed
}

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(16);
  const [sortOption, setSortOption] = useState<string>('');
  const { data = [] } = useCartContext(); // Fallback if no data is found

  // Memoized unique products to avoid recalculating on every render
  const uniqueProducts = useMemo(() => {
    return data.filter((product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
    );
  }, [data]);

  // Handling sorting options
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle page change event
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset sorting and page to initial state
  const handleViewAll = () => {
    setCurrentPage(1);
    setSortOption('');
  };

  // Refine products based on sort option (memoized)
  const refinedProducts = useMemo(() => {
    return sortOption === 'From Expensive to Cheap'
      ? [...uniqueProducts].sort((a, b) => b.price - a.price)
      : [...uniqueProducts].sort((a, b) => a.price - b.price);
  }, [uniqueProducts, sortOption]);

  // Paginate the refined list
  const paginatedProducts = useMemo(() => {
    return refinedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [refinedProducts, currentPage, itemsPerPage]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(refinedProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen w-screen">
      <WebsiteBanner title="Shop" />

      {/* Filter Section (Only visible on medium and larger screens) */}
      <div className="hidden md:block">
        <div className="cp w-full bg-[#FAF4F4] flex-wrap flex-between py-5">
          <section className="flex items-center gap-6 md:gap-8 md:w-[50%]">
            <img src="/images/Filter1.png" alt="Filter Icon" />
            <span className="font-medium text-lg tracking-wider">Filter</span>
            <img src="/images/Filter2.png" alt="Filter Icon" />
            <img src="/images/Filter3.png" alt="Filter Icon" />
            <span className="text-3xl">|</span>
            <span className="text-[.8em] md:text-[1.1em] font-medium tracking-wider">
              Showing {paginatedProducts.length} of {refinedProducts.length} Results
            </span>
          </section>
          <section className="flex items-center gap-4 md:w-[40%]">
            <span className="text-lg font-medium tracking-wide">Sort By</span>
            <select
              className="outline-none text-[1em] placeholder:text-xl w-max rounded-lg border-none bg-white p-3 placeholder:text-[#4F4F4F]"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="From Expensive to Cheap">From Expensive to Cheap</option>
              <option value="From Cheap to Expensive">From Cheap to Expensive</option>
            </select>
          </section>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product, index) => (
            <ProductItem
              key={product.id}
              index={index}
              item={{ ...product, id: product.id.toString() }} // Ensure the id is a string for consistency
            />
          ))
        ) : (
          <p>No products available at the moment.</p> // Handle case with no products
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onViewAll={handleViewAll}
      />

      {/* Guarantees Section */}
    {/* <ShopMain /> */}
      <ShopPage />
    <ShopMain />
    </div>
  );
};

export default Page;
