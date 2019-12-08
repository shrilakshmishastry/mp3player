import React from 'react';
import {Container,Row,Col,Image} from 'react-bootstrap';
import musicSignin from './../images/signup.png';

class Signup extends React.Component{
  state={
    name:" ",
    password:" ",
    email:" ",
      };


  render(){
    return(
      <div>
        <Container className="pt-5">
          <Row>
            <Col md={6} className="bg-dark" >
              <Image src={musicSignin} className="img-fluid" />
            </Col>
            <Col md={6} className="bg-success" >
            <h3 className=" pt-3 pt-md-5  font-weight-bold" >Signin</h3>
            <p className="small text-secondary" >Welcome back! Please login to your account</p>
            <form  onSubmit={this.handleSubmit} >
              <label className="d-flex flex-column pt-4" >
              <h6 className="text-secondary" >User Name</h6>
                <input type="text" style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border"  value={this.state.value} onChange={this.handleNameChange} />
                <h6 className="text-secondary pt-4" >Password</h6>
                <input type="password" style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border" value={this.state.password} onChange={this.handlePasswordchange} />
                <input type="submit" value="Submit" className="mt-4 btn btn-dark rounded-pill" />
                <small className="text-secondary text-center mt-4">Dont have an account??
                  <Link className="ml-3"to="/signup" >Click here</Link>
                </small>
              </label>
            </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
