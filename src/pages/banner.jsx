import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/home.css';
import Catalog from './programs';

const Banner = () => {
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
    <div className="banner-page" style={{ position: 'relative', paddingBottom: '100px'}}>
        {/* Video Background */}
        <div style={{
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
            minHeight: 'calc(100vh - 60px)'
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        </div>

        {/* Content Container */}
        <Container 
            className="d-flex flex-column align-items-center justify-content-center" 
            style={{ 
            position: 'relative',
            zIndex: 1,
            minHeight: 'calc(100vh - 60px)',
            padding: '2rem 0'
            }}
        >
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {<Row xs={1} md={2} lg={2} className="g-4 row-container justify-content-center">
            {cardData.map((card) => (
              <Col key={card.id} className='col-cards' xs="12">
                <Card className="h-100 shadow" style={{ borderRadius: '25px' }}>
                  <Card.Img 
                    className="card-img-top" 
                    variant="top" 
                    src={card.imageUrl} 
                  />
                </Card>
              </Col>
            ))}
            <Col key="catalog-id" className='col-cards' xs="12">
              <Card 
                className="h-100 shadow" 
                onClick={() => navigate('/catalog')}
                style={{
                  backgroundColor: 'rgba(0,0,0,0)',
                  backgroundImage: 'url(banner/catalog.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  border: '2px',
                  backgroundPosition: '0px 50%',
                  borderRadius: '25px',
                  borderBottomStyle: 'dotted',
                  borderBottomWidth: '3px',
                  borderColor: 'rgb(224,31,69)'
                }}
              >
                <Card.Body style={{
                //   paddingTop: '58px',
                //   paddingBottom: '58px',
                //   paddingRight: '58px',
                //   paddingLeft: '58px'
                }}>
                  <Card.Title style={{
                    width: '60%', 
                    marginLeft: 'auto', 
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                    fontSize: '51px',
                    textAlign: 'right',
                    fontFamily: 'Advent Pro',
                    color: 'white'
                  }}>Euphoria Catalog</Card.Title>

                  <div className='button-wrapper' style={{ display: 'block', textAlign: 'right' }}>
                    <a style={{
                      marginTop: '20px',
                      fontSize: '20px',
                      color: 'rgb(224,31,69)',
                      fontWeight: '600',
                      paddingBlock: '6px',
                      paddingInline: '20px',
                      display: 'inline-block',
                      backgroundColor: 'white',
                      borderRadius: '19px',
                      cursor: 'pointer'
                    }}>Check Me!</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row> }
        </div>
      </Container>
    </div>
  );
};

export default Banner;