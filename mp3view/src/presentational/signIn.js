import React from 'react';
import {Container,Row,Col,Image} from 'react-bootstrap';
import axios from 'axios';
import musicLogin from './../images/music.png';

import {Link} from "react-router-dom";


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"




class SignIn extends React.Component{
  state={
    value:"",
    password:"",
  };

  componentDidMount(){

  }

handleSubmit=(event)=>{

    event.preventDefault();
    axios({
      method:'POST',
      url:'signin',
      data:{
        name:this.state.value,
        password:this.state.password
      }
    })
    .then((res)=>{

      let token = res.data['token']
      localStorage.setItem('token',token);
      window.location = "/";
    })
    .catch((error)=>{
      alert("Please enter valid data");
      console.clear();
      this.setState({
        value:"",
        password:""
      });

    })
}

handleNameChange=(event)=>{
  this.setState({
    value:event.target.value
  });

}
handlePasswordchange = (event)=>{
  this.setState({
    password:event.target.value
  });

}

  render(){
    return(
        <div className="textFamily">
            <Container className="pb-3 pb-md-0">
              <Row className="pt-md-5">
                <Col md={6}  className="">
                  <Image src={musicLogin} className="img-fluid" />
                </Col>
                <Col md={{span:4,offset:1}} className="" >
                  <h3 className=" pt-3 pt-md-5  font-weight-bold" >Signin</h3>
                  <p className="small text-secondary" >Welcome back! Please login to your account</p>
                  <form  onSubmit={this.handleSubmit} >
                    <label className="d-flex flex-column pt-4" >
                    <h6 className="text-secondary" >User Name</h6>
                      <input type="text" style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border"  value={this.state.value} onChange={this.handleNameChange} required/>
                      <h6 className="text-secondary pt-4" >Password</h6>
                      <input type="password" style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border" value={this.state.password} onChange={this.handlePasswordchange} required />
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

};

export default SignIn;
