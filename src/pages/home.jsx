import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

const Home = () => {
  // Card data array - you can modify this or fetch from API
  const cardData = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card with some sample text.",
      imageUrl: "https://comifuro.net/wp-content/uploads/2025/01/cf20circlereg-1.jpg"
    }
  ];

  return (
    <Container className="home-page">
      <h1 className="text-center my-5"></h1>
      
      <Row xs={1} md={2} lg={2} className="g-4 row-container" style={{marginTop: '150px'}}>
        {cardData.map((card) => (
          <Col key={card.id}>
            <Card className="h-100 shadow" style={{borderRadius: '25px'}}>
              <Card.Img style={{objectFit: 'cover'}} variant="top" src={card.imageUrl} />
              {/* <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body> */}
              {/* <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer> */}
            </Card>
          </Col>
        ))}
        <Col key="catalog-id">
            <Card className="h-100 shadow" 
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              backgroundImage: 'url(banner/catalog.jpg)', 
              backgroundSize: 'cover', 
              backgroundRepeat: 'no-repeat',
              border: '2px',
              backgroundPosition: '-60px 50%',
              borderRadius: '25px',
              borderBottomStyle: 'dotted',
              borderBottomWidth: '3px',
              borderColor: 'rgb(224,31,69)'
              }}>
              {/* <Card.Img style={{objectFit: 'contain'}} variant="top" /> */}
              <Card.Body style={{
                paddingTop: '58px',
                paddingBottom: '58px',
                paddingRight: '58px',
                paddingLeft: '58px'
              }}>
                <Card.Title style={{
                  fontSize: '51px',
                  textAlign: 'right',
                  fontFamily: 'Advent Pro',
                  color: 'white'
                }}>Euphoria Catalog</Card.Title>

                <div className='button-wrapper' style={{display: 'block', textAlign: 'right'}}>
                  <a style={{
                    marginTop: '20px',
                    fontSize: '20px',
                    color: 'rgb(224,31,69)',
                    fontWeight: '600',
                    paddingBlock: '6px',
                    paddingInline: '20px',
                    display: 'inline-block',
                    backgroundColor: 'white',
                    borderRadius: '19px'
                  }}>Check Me!</a>
                </div>
                
                {/* <Card.Text>Euphoria</Card.Text> */}
              </Card.Body>
              {/* <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer> */}
            </Card>
          </Col>
      </Row>
    </Container>
  );
};

export default Home;