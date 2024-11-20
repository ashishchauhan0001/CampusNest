import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-[#f4f4f4] shadow-md shadow-red-200 mb-20">
      <div className="container mx-auto flex items-center justify-between p-4">
      <Link to="/" className="flex items-center hover:no-underline hover:scale-105 transition-transform duration-200 ease-in-out">
  <h1 className="text-white font-sans font-bold text-2xl">
    <span className="text-red-500">Campus</span>
    <span className="text-black">Nest</span>
  </h1>
</Link>


        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-lg shadow-md px-3 py-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-32 md:w-64 outline-none px-2 text-gray-700"
             minlength="2"
            maxlength="12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="text-gray-600 hover:text-gray-800">
            <FaSearch className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-white font-medium">
            <button className="bg-red-500 hover:bg-red-600 hover:scale-105 hover:border-e-zinc-300 text-white px-4 py-2 rounded-lg shadow">
              Home
            </button>
          </Link>

          <Link to="/about" className="text-white font-medium">
            <button onClick={() => navigate('/about')} className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow">
              About
            </button>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="w-10 h-10 rounded-full border-2 border-black object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                Sign in
              </button>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
