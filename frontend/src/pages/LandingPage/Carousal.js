import { Carousel } from "flowbite-react";
import banner1 from "./Images/banner1.png";
import banner2 from "./Images/banner2.png";
import banner3 from "./Images/banner3.png";
import banner4 from "./Images/banner4.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Carousal() {
  const [data, setData] = useState([]);

  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=32d17a9cf12f40299efe01dee6635459"
      )
      .then((response) => {
        setData(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching the news:", error);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="flex bg-white flex-wrap gap-6 p-20 bg-gradient-to-b bg-slate-50">
      {/* Carousel Section */}
      <div className="flex-1 lg:w-2/3 rounded-lg shadow-md overflow-hidden">
        <Carousel className="w-full h-[500px]">
          <div className="flex h-full items-center justify-center bg-gray-100">
            <img
              src={banner1}
              alt="banner1"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-100">
            <img
              src={banner2}
              alt="banner2"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-100">
            <img
              src={banner3}
              alt="banner3"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex h-full items-center justify-center bg-gray-100">
            <img
              src={banner4}
              alt="banner4"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </Carousel>
      </div>

      {/* News Update Section */}
      <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">
          News Updates
        </h2>
        <div className="relative h-96 overflow-hidden">
          <div
            className="absolute inset-0 flex flex-col space-y-4"
            style={{
              animation: "vertical-scroll 10s linear infinite",
            }}
          >
            {data.map((article, index) => (
              <div
                key={index}
                className="text-sm lg:text-base text-gray-800 font-medium px-4 py-2 bg-gray-50 shadow rounded-md hover:bg-gray-100 transition"
              >
                {article.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousal;
