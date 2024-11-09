// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ListingItem from '../components/ListingItem';

// export default function Search() {
//   const navigate = useNavigate();
//   const [sidebardata, setSidebardata] = useState({
//     searchTerm: '',
//     type: 'all',
//     parking: false,
//     furnished: false,
//     offer: false,
//     sort: 'created_at',
//     order: 'desc',
//   });

//   const [loading, setLoading] = useState(false);
//   const [listings, setListings] = useState([]);
//   const [showMore, setShowMore] = useState(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     const typeFromUrl = urlParams.get('type');
//     const parkingFromUrl = urlParams.get('parking');
//     const furnishedFromUrl = urlParams.get('furnished');
//     const offerFromUrl = urlParams.get('offer');
//     const sortFromUrl = urlParams.get('sort');
//     const orderFromUrl = urlParams.get('order');

//     if (
//       searchTermFromUrl ||
//       typeFromUrl ||
//       parkingFromUrl ||
//       furnishedFromUrl ||
//       offerFromUrl ||
//       sortFromUrl ||
//       orderFromUrl
//     ) {
//       setSidebardata({
//         searchTerm: searchTermFromUrl || '',
//         type: typeFromUrl || 'all',
//         parking: parkingFromUrl === 'true' ? true : false,
//         furnished: furnishedFromUrl === 'true' ? true : false,
//         offer: offerFromUrl === 'true' ? true : false,
//         sort: sortFromUrl || 'created_at',
//         order: orderFromUrl || 'desc',
//       });
//     }

//     const fetchListings = async () => {
//       setLoading(true);
//       setShowMore(false);
//       const searchQuery = urlParams.toString();
//       const res = await fetch(`/api/listing/get?${searchQuery}`);
//       // const res = await fetch(`http://localhost:3000/api/listing/get`);
//       const data = await res.json();
//       if (data.length > 8) {
//         setShowMore(true);
//       } else {
//         setShowMore(false);
//       }
//       setListings(data);
//       setLoading(false);
//     };

//     fetchListings();
//   }, [location.search]);

//   const handleChange = (e) => {
//     if (
//       e.target.id === 'all' ||
//       e.target.id === 'rent' ||
//       e.target.id === 'sale'
//     ) {
//       setSidebardata({ ...sidebardata, type: e.target.id });
//     }

//     if (e.target.id === 'searchTerm') {
//       setSidebardata({ ...sidebardata, searchTerm: e.target.value });
//     }

//     if (
//       e.target.id === 'parking' ||
//       e.target.id === 'furnished' ||
//       e.target.id === 'offer'
//     ) {
//       setSidebardata({
//         ...sidebardata,
//         [e.target.id]:
//           e.target.checked || e.target.checked === 'true' ? true : false,
//       });
//     }

//     if (e.target.id === 'sort_order') {
//       const sort = e.target.value.split('_')[0] || 'created_at';

//       const order = e.target.value.split('_')[1] || 'desc';

//       setSidebardata({ ...sidebardata, sort, order });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams();
//     urlParams.set('searchTerm', sidebardata.searchTerm);
//     urlParams.set('type', sidebardata.type);
//     urlParams.set('parking', sidebardata.parking);
//     urlParams.set('furnished', sidebardata.furnished);
//     urlParams.set('offer', sidebardata.offer);
//     urlParams.set('sort', sidebardata.sort);
//     urlParams.set('order', sidebardata.order);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   const onShowMoreClick = async () => {
//     const numberOfListings = listings.length;
//     const startIndex = numberOfListings;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('startIndex', startIndex);
//     const searchQuery = urlParams.toString();
//     const res = await fetch(`/api/listing/get?${searchQuery}`);
//     const data = await res.json();
//     if (data.length < 9) {
//       setShowMore(false);
//     }
//     setListings([...listings, ...data]);
//   };
//   return (
//     <div className='flex flex-col md:flex-row'>
//       <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
//         <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
//           <div className='flex items-center gap-2'>
//             <label className='whitespace-nowrap font-semibold'>
//               Search Term:
//             </label>
//             <input
//               type='text'
//               id='searchTerm'
//               placeholder='Search...'
//               className='border rounded-lg p-3 w-full'
//               value={sidebardata.searchTerm}
//               onChange={handleChange}
//             />
//           </div>
//           <div className='flex gap-2 flex-wrap items-center'>
//             <label className='font-semibold'>Type:</label>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='all'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={sidebardata.type === 'all'}
//               />
//               <span>Rent & Sale</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='rent'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={sidebardata.type === 'rent'}
//               />
//               <span>Rent</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='sale'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={sidebardata.type === 'sale'}
//               />
//               <span>Sale</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='offer'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={sidebardata.offer}
//               />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className='flex gap-2 flex-wrap items-center'>
//             <label className='font-semibold'>Amenities:</label>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='parking'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={sidebardata.parking}
//               />
//               <span>Parking</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='furnished'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={sidebardata.furnished}
//               />
//               <span>Furnished</span>
//             </div>
//           </div>
//           <div className='flex items-center gap-2'>
//             <label className='font-semibold'>Sort:</label>
//             <select
//               onChange={handleChange}
//               defaultValue={'created_at_desc'}
//               id='sort_order'
//               className='border rounded-lg p-3'
//             >
//               <option value='regularPrice_desc'>Price high to low</option>
//               <option value='regularPrice_asc'>Price low to hight</option>
//               <option value='createdAt_desc'>Latest</option>
//               <option value='createdAt_asc'>Oldest</option>
//             </select>
//           </div>
//           <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
//             Search
//           </button>
//         </form>
//       </div>
//       <div className='flex-1'>
//         <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
//           Listing results:
//         </h1>
//         <div className='p-7 flex flex-wrap gap-4'>
//           {!loading && listings.length === 0 && (
//             <p className='text-xl text-slate-700'>No listing found!</p>
//           )}
//           {loading && (
//             <p className='text-xl text-slate-700 text-center w-full'>
//               Loading...
//             </p>
//           )}

//           {!loading &&
//             listings &&
//             listings.map((listing) => (
//               <ListingItem key={listing._id} listing={listing} />
//             ))}

//           {showMore && (
//             <button
//               onClick={onShowMoreClick}
//               className='text-green-700 hover:underline p-7 text-center w-full'
//             >
//               Show more
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import './search.css'; 
import Card from '../components/Card.jsx'

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    // type: 'all',
    amenities: {
      parking: false,
      furnished: false,
      wifi: false,
      mess: false,
      gym: false,
      ac: false,
      electricBackup: false,
      laundry: false,
      houseKeeping: false,
    },
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    // const typeFromUrl = urlParams.get('type');
    const amenitiesFromUrl = urlParams.get('amenities');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      // typeFromUrl ||
      amenitiesFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        // type: typeFromUrl || 'all',
        amenities: amenitiesFromUrl ? JSON.parse(amenitiesFromUrl) : sidebardata.amenities,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      console.log("TESTING : - ", searchQuery);
      
      // const res = await fetch(`/api/listing/get?${searchQuery}`);
      const res = await fetch(`http://localhost:3000/api/vendor/allvendors?${searchQuery}`);
      console.log("RESPONSE : ", res);
      const data = await res.json();
      console.log("DATA : ", data);
      
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    
    if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    }
    
    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }

    if (e.target.type === 'checkbox') {
      setSidebardata({
        ...sidebardata,
        amenities: {
          ...sidebardata.amenities,
          [id]: checked,
        },
      });
    }

    // if (id === 'type') {
    //   setSidebardata({ ...sidebardata, type: value });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    // urlParams.set('type', sidebardata.type);
    urlParams.set('amenities', JSON.stringify(sidebardata.amenities));
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    
    console.log(searchQuery,"Next Data");
    

    // const res = await fetch(`/api/listing/get?${searchQuery}`);
    const res = await fetch(`/api/listing/allvendors?${searchQuery}`);
    const data = await res.json();
    console.log(data);
    
    
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="search-container">
      <div className="sidebar">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="form-group">
            <label>Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
 
          <div className="checkbox-group">
            <label>Amenities:</label>
            <div>
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={sidebardata.amenities.parking}
              />
              <span>Parking</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={sidebardata.amenities.furnished}
              />
              <span>Furnished</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="wifi"
                onChange={handleChange}
                checked={sidebardata.amenities.wifi}
              />
              <span>Wifi</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="mess"
                onChange={handleChange}
                checked={sidebardata.amenities.mess}
              />
              <span>Mess</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="gym"
                onChange={handleChange}
                checked={sidebardata.amenities.gym}
              />
              <span>Gym</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="ac"
                onChange={handleChange}
                checked={sidebardata.amenities.ac}
              />
              <span>AC</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="electricBackup"
                onChange={handleChange}
                checked={sidebardata.amenities.electricBackup}
              />
              <span>Electricity Backup</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="laundry"
                onChange={handleChange}
                checked={sidebardata.amenities.laundry}
              />
              <span>Laundry</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="houseKeeping"
                onChange={handleChange}
                checked={sidebardata.amenities.houseKeeping}
              />
              <span>House Keeping</span>
            </div>
          </div>

          <div className="form-group">
            <label>Sort:</label>
            <select onChange={handleChange} id="sort_order">
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

       <div className="listings">
        <h1>Listing results:</h1>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : listings.length === 0 ? (
          <p>No listing found!</p>
        ) : (
          listings.map((listing) => <Card key={listing._id} listing={listing} />)
          //  Card 
        )}

        {showMore && (
          <button onClick={onShowMoreClick} className="show-more">
            Show more
          </button>
        )}
      </div> 
    </div>
  );
}
