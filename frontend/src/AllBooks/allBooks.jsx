import React, { useEffect, useState } from 'react';
import Main from './Main';
import RowSlides from './RowSlides';

const AllBooks = () => {
  const [fictionBooks, setFictionBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [fantasyBooks, setFantasyBooks] = useState([]);
  const [mysteryBooks, setMysteryBooks] = useState([]);
  const [horrorBooks, setHorrorBooks] = useState([]);
  const [selfHelpBooks, setSelfHelpBooks] = useState([]);
  const [biographyBooks, setBiographyBooks] = useState([]);
  const [romanceBooks, setromanceBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks('Fiction');
    fetchBooks('History');
    fetchBooks('Fantasy');
    fetchBooks('Mystery');
    fetchBooks('Horror');
    fetchBooks('Self-help');
    fetchBooks('Biography');
    fetchBooks('romance');
  }, []);

  const fetchBooks = (category) => {
    fetch(`http://localhost:5000/api/books/all-books${category ? `?category=${category}` : ""}`)
      .then(res => res.json())
      .then(data => {
        switch (category) {
          case 'Fiction':
            setFictionBooks(data);
            break;
          case 'History':
            setHistoryBooks(data);
            break;
          case 'Fantasy':
            setFantasyBooks(data);
            break;
          case 'Mystery':
            setMysteryBooks(data);
            break;
          case 'Horror':
            setHorrorBooks(data);
            break;
          case 'Self-help':
            setSelfHelpBooks(data);
            break;
          case 'Biography':
            setBiographyBooks(data);
            break;
          case 'romance':
            setromanceBooks(data);
          break;
          default:
            break;
        }
      });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAllBooksClick = () => {
    setSelectedCategory(null);
  };

  // Filter books based on search query
  const filteredBooks = selectedCategory
    ? (selectedCategory === 'Fiction' ? fictionBooks : selectedCategory === 'History' ? historyBooks : selectedCategory === 'Fantasy' ? fantasyBooks : selectedCategory === 'Mystery' ? mysteryBooks : selectedCategory === 'Horror' ? horrorBooks : selectedCategory === 'Self-help' ? selfHelpBooks : selectedCategory === 'romance' ? romanceBooks : biographyBooks)
    : (
      fictionBooks.concat(historyBooks, fantasyBooks, mysteryBooks, horrorBooks, selfHelpBooks, biographyBooks)
    ).filter(book => book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()));

  // Event handler for input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 bg-gray-200 mt-16 ">
          <div className="p-4">
            {/* Search bar and button */}
            <div className="mb-4 flex items-center">
              <input 
                type="search" 
                placeholder="Search books..." 
                className="w-full border border-gray-300 px-4 py-2 rounded-md mr-2" 
                onChange={handleInputChange} 
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => {
                  setSelectedCategory(null); // Clear selected category when searching
                  setSearchQuery(''); // Clear search query
                }}
              >
                Search
              </button>
            </div>
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleCategoryClick('Fiction')} className="w-full py-3 text-left ">Fiction</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('History')} className="w-full py-3 text-left ">History</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Fantasy')} className="w-full py-3 text-left ">Fantasy</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Mystery')} className="w-full py-3 text-left ">Mystery</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Horror')} className="w-full py-3 text-left ">Horror</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Self-help')} className="w-full py-3 text-left ">Self-help</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Biography')} className="w-full py-3 text-left ">Biography</button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('romance')} className="w-full py-3 text-left ">Romance</button>
              </li>
              <li>
                <button onClick={handleAllBooksClick} className="w-full py-3 text-left ">All Books</button>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="w-3/4">
          <Main />
          {(searchQuery === '' && selectedCategory === null) ? (
            <>
              <RowSlides title='Fiction' books={fictionBooks} rowID='1'/>
              <RowSlides title='Mystery' books={mysteryBooks} rowID='2'/>
              <RowSlides title='Fantasy' books={fantasyBooks} rowID='3'/>
            </>
          ) : (
            <RowSlides title={selectedCategory || 'Search Results'} books={filteredBooks} rowID='1'/>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default AllBooks;
