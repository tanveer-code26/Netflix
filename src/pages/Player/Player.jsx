import React, { useEffect, useState } from 'react'; // Added useState import
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "" // Renamed 'typeof' to 'type' to avoid using reserved keyword
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTA2NTQ2MGZmYWNmODM3NTVmMjVlMjhjZmU2MDgyNyIsIm5iZiI6MTcyMzM2Mjg2Ni4xODY2OTQsInN1YiI6IjY0ZTExN2QzZTE5ZGU5MDBlMzQzN2RkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ox9Uu-IuST4EYLtjuIpXVEDCM1xtpv02B3ncJhQsbCI'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0" // Corrected JSX attribute
        allowFullScreen>
      </iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p> 
        <p>{apiData.name}</p> 
        <p>{apiData.type}</p> 
      </div>
    </div>
  );
};

export default Player;
