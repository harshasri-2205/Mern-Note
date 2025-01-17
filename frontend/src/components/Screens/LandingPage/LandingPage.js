 import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './LandingPage.css'
import { Link } from 'react-router-dom';
 
const LandingPage = () => {
    //  const navigate = useNavigate();
    //  useEffect(() => {
    //    const userInfo = localStorage.getItem("userInfo");
    //    if (userInfo) {
    //      navigate("/mynotes");
    //    }
    //  }, [navigate]);
   return (
     <div className="main">
       <Container>
         <Row>
           <div className="intro-text">
             <div>
               <h1 className="title">Welcome to Note Zipper</h1>
               <p className="subtitle">A simple note taking App</p>
             </div>
             <div className="buttonContainer">
               <Link to="/login">
                 <Button
                   size="lg"
                   className="landingbutton"
                   variant="outline-primary"
                 >
                   Login
                 </Button>
               </Link>
               <Link to="/register">
                 <Button
                   size="lg"
                   className="landingbutton"
                   variant="outline-primary"
                 >
                   Sign Up
                 </Button>
               </Link>
             </div>
           </div>
         </Row>
       </Container>
     </div>
   );
 }
 
 export default LandingPage
 