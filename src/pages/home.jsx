import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.module.css';

import Programs from './programs';
import Banner from './banner';

const Home = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const videoUrl = 'https://nijigenexpo.com/wp-content/uploads/2023/11/Header-Video-BW.mp4';
  // const videoUrl = 'http://135.181.108.78/Venom.mp4';

  useEffect(() => {
    const video = videoRef.current;
    
    const handleCanPlay = () => {
      console.log("Video can play");
      setVideoLoaded(true);
      video.play().catch(e => console.log("Autoplay prevented:", e));
    };

    const handleError = (e) => {
      console.error("Video error:", e);
      setVideoLoaded(false);
    };

    if (video) {
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.src = videoUrl;
      video.preload = "auto";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  const cardData = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card with some sample text.",
      imageUrl: "https://comifuro.net/wp-content/uploads/2025/01/cf20circlereg-1.jpg"
    }
  ];

  return (
    <div className="home-page" style={{ position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      {/* Video Background */}
      {/* <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: videoLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          loop
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            minHeight: 'calc(100vh - 200px)'
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div> */}
      <Banner/>
      <Programs/>
    </div>
  );
};

export default Home;