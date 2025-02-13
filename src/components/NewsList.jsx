import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://west.edu.mn:3000/api/v1/news";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setNews(response.data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div>
      <h2 class="text-3xl font-bold text-center mb-6">Мэдээ мэдээлэл</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <div class="bg-gray-100 p-4 rounded-lg shadow-md" key={item.id}>
              <h3 class="text-xl font-semibold">{item.title}</h3>
              <p class="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))
        ) : (
          <p class="text-center text-gray-500">Мэдээлэл олдсонгүй.</p>
        )}
      </div>
    </div>
  );
}
