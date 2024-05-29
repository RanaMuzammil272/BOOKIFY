import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogPage() {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        fetchUnsplashImage(response.data.Title);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
        setIsLoading(false);
      });
  }, [id]);

  const fetchUnsplashImage = async (searchTerm) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random/`, {
        params: {
          query: searchTerm,
          client_id: 'yt46gl5IHzN36Z5R-kSJfapK_DqC6poexU0b8nrwnJQ',
          orientation: 'landscape',
          w: 1200,
          h: 600,
        },
      });
      setImageUrl(response.data.urls.regular);
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!blog) {
    return <div className="flex items-center justify-center h-screen">Blog not found</div>;
  }

  return (
    <div className="mt-10 container mx-auto py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <img
          src={imageUrl}
          alt={blog.Title}
          className="w-full h-96 object-cover rounded-t-lg"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{blog.Title}</h1>
          <div className="flex items-center mb-6">
            <div>
              <p className="text-gray-800 font-bold">{blog.authorName}</p>
              
            </div>
          </div>
          <div className="prose max-w-none mb-6">{blog.description}</div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600 mr-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="text-gray-600">
                {blog.readingTime} min read
              </span>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default BlogPage;