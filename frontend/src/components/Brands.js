import React from "react";
import { brands } from "../data/Data";
import Heading from "../common/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Brands = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Desktop default
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    // --- Responsive Breakpoints ---
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768, // Small Tablets/Large Phones
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480, // Mobile Phones
        settings: {
          slidesToShow: 1, // Show 1 card fully, or 1.5 to show there's more
          centerMode: true,
          centerPadding: "20px",
        }
      }
    ]
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="w-11/12 md:w-10/12 m-auto">
        <Heading heading={"Best Deals On The Brands"} />
        
        <Slider {...settings}>
          {brands.map((item, index) => (
            <div key={index} className="px-2"> {/* Added padding for gap between cards */}
              <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 h-full">
                <div className="relative aspect-square md:h-48 overflow-hidden bg-gray-50">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4 text-center">
                  <p className="text-rose-600 font-bold text-sm md:text-base truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {item.short_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Brands;