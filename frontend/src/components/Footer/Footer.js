import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div style={{display:'flex', justifyContent: 'center' ,bottom:'0', position:'relative', width:'100%'}}>
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; 2025 Harshasri</Col>
          </Row>
        </Container>
 
      </footer>
    </div>
  );
}

export default Footer
