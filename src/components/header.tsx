import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import headersofa from "/public/headersofa.png";
import headertable from "/public/headertable.png";
import headersofas from "/public/headersofas.png";

const HeroSecp2 = () => {
  const products = [
    {
      id: 1,
      name: "Side table",
      image: headertable,
      href: "#",
    },
    {
      id: 2,
      name: "Side table",
      image: headersofas,
      href: "#",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-[600px] bg-[#FBEBB5] flex items-center relative flex-col lg:flex-row">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:absolute lg:left-[300px] w-full px-4 lg:px-0">
          <h1 className="text-[#000000] font-poppins font-medium text-4xl sm:text-5xl lg:text-6xl leading-snug">
            Rocket Single <br /> Seater
          </h1>
          <Link
            href="/shop"
            className="mt-6 inline-block border-b-2 border-black pb-1 text-lg font-medium transition-all duration-300 hover:translate-y-[-3px] hover:text-blue-950 hover:shadow-lg hover:font-bold"
          >
            Shop Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-[700px] flex justify-center mt-6 lg:mt-0 lg:absolute lg:right-[100px]">
          <Image
            src={headersofa}
            alt="Sofa Single Seater"
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[700px] h-auto object-contain"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16 bg-[#FAF4F4] max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="border-none shadow-none bg-[#FAF4F4]">
              <CardContent className="p-0">
                <div className="relative aspect-square w-full -mb-32">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 px-5">
                <h2 className="text-2xl font-medium text-black">{product.name}</h2>
                <Link
                  href={product.href}
                  className="text-sm text-black underline underline-offset-8 hover:text-gray-600 transition-colors"
                >
                  View More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSecp2;
// Mock API function to fetch products
const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Side table",
          image: headertable,
          href: "#",
        },
        {
          id: 2,
          name: "Side table",
          image: headersofas,
          href: "#",
        },
      ]);
    }, 1000);
  });
};

// Example usage of the mock API
fetchProducts().then((products) => {
  console.log(products);
});