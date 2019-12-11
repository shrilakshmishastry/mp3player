import React from 'react';
import {Container,Row,Col,Image} from 'react-bootstrap';
import musicSignin from './../images/signup.png';
import axios from 'axios';


class Signup extends React.Component{
  state={
    name:"",
    password:"",
    email:" ",
      };

handleSubmit=(event)=>{

  event.preventDefault();
  axios({
    method:'post',
    url:'signup',
    data:{
      name:this.state.name,
      password:this.state.password,
      email:this.state.email
    }
  })
  .then((res)=>{
  
    this.props.history.push("/signin");
  })
  .catch((res)=>{
    alert("Please enter valid data");
    console.clear()
    this.setState({
      name:"",
      password:"",
      email:""
    });
  })

}
handleNameChange=(event)=>{
  this.setState({
    name:event.target.value
  });
}
handlePasswordchange=(event)=>{
  this.setState({
    password:event.target.value
  });
}
handleEmailChange=(event)=>{
  this.setState({
    email:event.target.value
  });
};
  render(){
    return(
      <div>
        <Container className="pt-5">
          <Row>
            <Col md={6} className="" >
              <Image src={musicSignin} className="img-fluid" />
            </Col>
            <Col md={{span:4,offset:1}} className="" >
            <h3 className=" pt-3  font-weight-bold" >SignUp</h3>
            <p className="small text-secondary" >Welcome !! Please Signin to create your  account</p>
            <form  onSubmit={this.handleSubmit} >
              <label className="d-flex flex-column pt-4" >
              <h6 className="text-secondary" >User Name</h6>
                <input type="text" style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border"  value={this.state.name} onChange={this.handleNameChange} required/>
                <h6 className="text-secondary pt-4" >Password</h6>
                <input type="password" style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border" value={this.state.password} onChange={this.handlePasswordchange} required/>
                <h6 className="text-secondary pt-4">Email</h6>
                <input type="email"style={{outline:'none'}} className="pl-3 pr-3 rounded-pill border" value={this.state.email} onChange={this.handleEmailChange} required/>
                <input type="submit" value="Submit" className="mt-4 btn btn-dark rounded-pill" />
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
