import React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {Row,Card,Image,Col,Container,NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import girl_image from './../images/favorite.png';


class Favorite extends React.Component{
  state = {
    loading:true,
    track_id:[],
    type:"track",
    track_name:[],
    release_date:[],
    photo_url:[],

  };
  componentDidMount(){
    if(localStorage.getItem("token")!== null){
      axios.get("/favorite",{
        params:{
          token:localStorage.getItem("token")
        }
      }).then((res)=>{
        console.log(res);
        let data = res.data.value;
        console.log(data);
        for (let i =0;i<data.length;i++){
          this.setState((prevState)=>({
            track_id:prevState.track_id.concat(data[i]["track_id"]),
            track_name:prevState.track_name.concat(data[i]["track_name"]),
            release_date:prevState.release_date.concat(data[i]["release_date"]),
            photo_url:prevState.photo_url.concat(data[i]["photo_url"])
          }));

        }

      })
      .catch((err)=>{

      })
    }
    else{
      console.log("no");
    }
  }

  handleCallback(key,type){

      this.props.history.push({
          pathname:'/album_play',
          state:{
              key:key,
              type:type
          }
      })
  }

handleIconClick=(track_name)=>{
  axios({
    method:'POST',
    url:'favorite',
    data:{
      track_name:track_name,
      type:"fas",
      token:localStorage.getItem('token')
    }
  })
  .then((res)=>{
    window.location = "/favorite";
  })
  .catch((err)=>{

  })

}

  listItem(value,photo_url,type,release_date,id){
    return (
          <Col md={6} className="mt-5" key={id} >
          <Card className="mb-2 shadow" >
          <Card.Body className="p-0 pt-3  justify-content-center" >
              <Row>
                <Col md={{span:3,offset:1}} sm={{span:3,offset:1}} xs={{span:3,offset:1}}>
                    <Image src={photo_url} style={{width:'50px',height:'50px'}} className=" mr-5" />
                </Col>
                <Col md={5} sm={5} xs={5} >
                  <div className="d-flex flex-column" >
                    <h6 className="font-weight-bold" >{value} </h6>
                    <p className="font-weight-bold text-secondary" >Released on:&nbsp;{release_date}</p>
                  </div>
                </Col>
                <Col md={3} sm={3} xs={3} >
                  <NavDropdown title="" className="text-center" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={()=>this.handleCallback(id,type)}>Play
                      <FontAwesomeIcon icon={['far',"play-circle"]}  style={{color:'black'}} className="ml-5"/>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={e=>this.handleIconClick(value)}>Remove
                      <FontAwesomeIcon icon={['far',"trash-alt"]}  style={{color:'black'}} className="ml-4"/>
                    </NavDropdown.Item>
                    </NavDropdown>
                </Col>
              </Row>
          </Card.Body>
        </Card>
      </Col>

    );
  }
  render(){
    if(this.state.loading){
       setInterval( ()=> {
        this.setState({
          loading:false
        });
      }, 2000);
      return(
        <div>
        <Row className="justify-content-center pt-5" >
          <ReactLoading color={"red"} type={"spokes"} className="" height={667} width={375} />
        </Row>
      </div>)
    }
    if(localStorage.getItem("token")==null){
      return(
        <div className="textFamily">

          <Row>
            <Col md={{span:4,offset:1}} className=" " >
              <div className="d-flex flex-column mt-5 mb-3  text-center d-block d-sm-none">
              <h3 className="font-weight-bold mt-5 pt-md-5" >
              OOps !! You don't have an account at
              </h3>
              <h3 className="mt-3" >
                 <Link to="/signin" className="font-weight-bold text-dark ">Create now !</Link>
              </h3>

              </div>
              <div className="d-flex flex-column mb-3  text-left d-none d-sm-block" style={{marginTop:'150px'}}>
              <h3 className="font-weight-bold " >
              OOps !! You don't have an account at
              </h3>
              <h3 className="mt-3" >
                 <Link to="/signup" className="font-weight-bold text-dark ">Create now !</Link>
              </h3>

              </div>
            </Col>
            <Col md={6} className="">
              <Image src={girl_image} className="img-fluid" />
            </Col>
          </Row>
        </div>
      );
    }
    else{
      return(
        <div className="textFamily">
          <Container className="pb-5">
            <Row className="mt-5 justify-content-center "  >
              <h2 className="font-weight-bold text-dark" >Your Treasure</h2>
            </Row>
            <Row className="justify-content-center mt-3"  >


                {
                  this.state.track_name.map((value,index)=>{
                    return(
                      this.listItem(value,this.state.photo_url[index],this.state.type,this.state.release_date[index],this.state.track_id[index])
                    )
                  })
                }


            </Row>
          </Container>
        </div>
      );
    }

  }
}

export default  Favorite;
