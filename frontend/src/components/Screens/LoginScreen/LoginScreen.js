import React, { useEffect, useState } from 'react'
import MainScreen from '../../MainScreen'
// import { Form } from 'react-router-dom';
import { Form,Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginScreen.css";
// import axios from 'axios';
import Loading from '../../Loding';
import ErrorMessage from '../../ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/userActions';

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  
  
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate,userInfo]);

   const submitHandler = async (e) => {
     e.preventDefault();
     dispatch(login(email,password))
    //  try {
    //    const config = {
    //      headers: {
    //        "Content-Type": "application/json",
    //      },
    //    };
    //    setLoading(true); 

    //    const {data} = await axios.post("/api/users/login", {
    //      email,password
    //    }, config);

    //    localStorage.setItem("userInfo",JSON.stringify(data))
    //    setLoading(false);
    //  } catch (err) {
    //    setError(err.response.data.message);
    //    setLoading(false);
    //  }
   };
  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {loading ? <Loading /> : null}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen



// import React, { useEffect, useState } from 'react'
// import MainScreen from '../../MainScreen'
// import { Form } from 'react-router-dom';
// import { Form,Button, Row, Col } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import "./LoginScreen.css";
// import axios from 'axios';
// import Loading from '../../Loding';
// import ErrorMessage from '../../ErrorMessage';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../../actions/userActions';

// const LoginScreen = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate()
  
  
//   const dispatch = useDispatch()
//   const userLogin = useSelector((state) => state.userLogin)
//   const { loading, error, userInfo } = userLogin;

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) {
//       navigate("/mynotes");
//     }
//   }, [navigate, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     dispatch(login(email, password))
//     try {
//       //    const config = {
//       //      headers: {
//       //        "Content-Type": "application/json",
//       //      },
//       //    };
//       //    setLoading(true); 

//       //    const {data} = await axios.post("/api/users/login", {
//       //      email,password
//       //    }, config);

//       //    localStorage.setItem("userInfo",JSON.stringify(data))
//       //    setLoading(false);
//       //  } catch (err) {
//       //    setError(err.response.data.message);
//       //    setLoading(false);
//       //  }
//     };
//     return (
//       <MainScreen title="Login">
//         <div className="loginContainer">
//           {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
//           {loading ? <Loading /> : null}
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={email}
//                 placeholder="Enter email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="mt-3">
//               Submit
//             </Button>
//           </Form>
//           <Row className="py-3">
//             <Col>
//               New User ? <Link to="/register">Register Here</Link>
//             </Col>
//           </Row>
//         </div>
//       </MainScreen>
//     );
//   }

// }
// export default LoginScreen
