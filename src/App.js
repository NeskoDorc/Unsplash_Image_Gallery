


import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';


const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;


export default function App() {
  
  const [images ,setImages] = useState([])

  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')



useEffect(() => {
  
getPhotos()
}, [page])

function getPhotos(){
  let apiUri =`https://api.unsplash.com/photos/`
  if(query) apiUri=`https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${query}`
  apiUri+=`?client_id=${accessKey}`
  apiUri+=`&page=${page}`
  
  

  fetch(apiUri)
 .then(res=>res.json())
 .then(data=>{
  console.log(data)
   const imagesFromApi=data.results ?? data;

   if(page==1) setImages(imagesFromApi)
   setImages(images =>[...images, ...imagesFromApi])
 })

}

function searchPhoto(e){
  e.preventDefault();
    setPage(1)
    getPhotos()


}

// return error if there is no access key

if(!accessKey){
  return <a href='https://unsplash.com/developers' className='error'>Required: Get Your Access Key</a>
}

  return (







    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhoto}>
        <input type="text" placeholder="Search Unsplash..."  value={query} onChange={e=> setQuery(e.target.value)}/>
        <button>Search</button>
      </form>

      <InfiniteScroll
  dataLength={images.length} //This is important field to render the next data
  next={()=>{
    setPage(page=>page+1)

    


  }}
  hasMore={true}
  loader={<h4>Loading...</h4>}>

      <div className="image-grid">
        {images.map((image, index) => (
          <a href={image.links.html} target='_blank' rel='noopener noreferrer' className="image" key={index}>
            <img src={image.urls.regular} alt={image.alt_description} />
          </a>
        ))}
      </div>

      </InfiniteScroll>
    </div>
  );
}



