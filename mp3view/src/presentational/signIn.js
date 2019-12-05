import React from 'react';
import {Container,Row,Col,Image,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import musicLogin from './../images/music.png';
import Cookies from 'js-cookie';


axios.defaults.xsrfCookieName = "shri"
axios.default.xsrfHeaderName = "X-CSRFTOKEN"

Cookies.set("csrftoken",'csrftoken')

class SignIn extends React.Component{
  componentDidMount(){
    axios({
      method:'post',
      url:'signin',
      xsrfHeaderName:'shri'
    })
    .then((res)=>{
      console.log(res);
    })
    console.log(Cookies.get('csrftoken'));
  }

  render(){
    return(
        <div className="textFamily">
            <Container>
              <Row>
                <Col md={6} className="bg-dark">
                  <Image src={musicLogin} className="img-fluid" />
                </Col>
                <Col md={6} className="bg-success" >
                  <form action="signin" method="post" >
                    <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrftoken")} />
                   <Button type="submit" >
                      Send
                    </Button>
                  </form>
                </Col>
              </Row>
            </Container>
        </div>
    );
  }

};

export default SignIn;
