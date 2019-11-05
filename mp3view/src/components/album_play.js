import React from 'react';
import PlayBoard from "../presentational/playboard";
import axios from 'axios';
import {Card, Col, Container, Image,Row,Table,thead,tr,th,tbody,Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



class  Album_play extends React.Component{
  state={
    album:[{
      track_name:[],
      artist_name:[],
      track_ur:[],
      icon:[]
    }],
    photo_url:"",
    album_name:"",
    composer_name:[],
    release_date:"",

  };
  trackUrl = [];
  componentDidMount(){
    console.log("hello");
    axios.get('album_board',{
      params:{
        key:this.props.location.state.key,
        type:this.props.location.state.type
      }
    })
    .then((res)=>{

      let  result = res.data;

      if(this.state.album.length){
          this.setState({
            album:[
              {
                track_name:result.value[0].track_name,
                artist_name:result.value[0].artist_name,
                track_url:result.value[0].track_url,
                icon:'far'
              }

            ]
          })
      }

      this.setState({
        photo_url:result.value[0].photo_url,
        album_name:result.value[0].album_name,
        composer_name:result.value[0].composer_name,
        release_date:result.value[0].release_date
      });

      for (var i = 1; i < result.value.length; i++) {
        let bool ;
        let t;
        for (var j=0;  j<this.state.album.length;j++){
           bool = this.state.album[j].track_name.includes(result.value[i].track_name);
           if(bool){
             t = j;
             break;
           }

        }

        if(!bool){

            this.setState({
              album:[
                ...this.state.album,
                {
                  track_name:result.value[i].track_name,
                  artist_name:result.value[i].artist_name,
                  track_url:result.value[i].track_url,
                  icon:"far"
                }
              ]
            })

        }
        else{
            var statecopy = Object.assign({},this.state);

            statecopy.album[t].artist_name= statecopy.album[t].artist_name.concat("," +result.value[i].artist_name);
            this.setState(statecopy)      ;

        }
      }

      

    })
    .catch((err)=>{
      console.log(err);
    })
  }


  // top image Component
  renderImage(url,album_name,release_date,composer_name){
    return(
      <Container>
        <Row>
          <Col md={3} className=" text-center">
            <Image  src={url} className="albumplay_top_image "  />
          </Col>
          <Col md={9} className="pt-md-4 pt-3 d-none d-sm-block" >
            <div className="d-flex flex-column" >
              <h3 className="font-weight-bold" >{album_name}</h3>
              <div className=" d-flex flex-row ">
                <p className="font-weight-bold mb-0">Composed by </p>&nbsp;
                <p className="ml-2 mb-0" >
                <a href={"https://www.google.com/search?q="+composer_name} className="text-secondary font-weight-bold" target="blank" >{composer_name}</a>
                </p>
              </div>
              <div className=" d-flex flex-row text-center">
                <p className="font-weight-bold mb-0 ">Released </p>&nbsp;
                <p className=" mb-0 font-weight-bold text-secondary" >
                &nbsp;
               {release_date}
                </p>
              </div>
            </div>
          </Col>
          <Col md={9} className="pt-md-4 pt-3 d-block d-sm-none text-center" >
            <div className="d-flex flex-column" >
              <h3 className="font-weight-bold" >{album_name}</h3>
              <div className=" d-flex flex-row text-center">
                <p className="font-weight-bold mb-0 ml-5 pl-4 ">Composed by </p>&nbsp;
                <p className=" mb-0" >
                &nbsp;
                <a href={"https://www.google.com/search?q="+composer_name} className="text-secondary font-weight-bold" target="blank" >{composer_name}</a>
                </p>
              </div>
              <div className=" d-flex flex-row ">
                <p className="font-weight-bold mb-0 ml-5 pl-5">Released </p>&nbsp;
                <p className=" mb-0 font-weight-bold text-secondary" >
                &nbsp;
               {release_date}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )

  }

handleIconClick=(index)=>{
console.log(index);
  var statecopy = Object.assign({},this.state);
if (this.state.album[index].icon==="far"){
  statecopy.album[index].icon="fas";
  this.setState(statecopy)      ;
}
else{
  statecopy.album[index].icon="far";
  this.setState(statecopy)      ;
}



}

handleClick=(trackUrl)=>{
  alert("clicked")
}
// listing tracks Component
  renderCardDesktop(artist_name,track_name,track_url,index,icon){
    return(
      <tr key={track_name} id="a" onClick={e=>this.handleClick(track_url)} >
        <td>
          {index+1}
        </td>
        <td>
          <FontAwesomeIcon icon={[icon,'heart']} style={{color:'red'}} onClick={ e=> this.handleIconClick(index)}  />
        </td>
        <td>

          {track_name}
        </td>
        <td>
          {artist_name}
        </td>
        <td>
          <Dropdown  >
            <Dropdown.Toggle id="dropdown-custom-1" variant="red" style={{color:'white'}}>
              <FontAwesomeIcon icon={['fas','ellipsis-h']} style={{color:'black'}} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="" >
              <Dropdown.Item eventKey="1">
              Download
              <FontAwesomeIcon icon={['fas','download']} className="ml-3"  />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    )
  }

// listing tracks Component Mobile View
  renderCardMobile(artist_name,track_name,track_url,index,icon){
    return(
      <div key={artist_name+track_name}>

        <Container  >
          <Row>
            <Col md={12} >
              <Card className="mb-4 " id="a">
                <Card.Body className="d-flex flex-column" >

                  <h5 className="font-weight-bold text-center " >
                    {track_name}
                  </h5>
                  <div className="text-center d-flex flex-column ">
                    <p className="mb-0 font-weight-bold textColor">ARTISTS:</p>
                    {artist_name}
                  </div>
                  <div className="d-flex flex-row justify-content-center" >
                    <FontAwesomeIcon icon={[icon,'heart']}  className=" mt-2 mr-5" style={{color:'red'}} onClick={ e=> this.handleIconClick(index)}  />
                    <Dropdown className="ml-5" >
                      <Dropdown.Toggle id="dropdown-custom-1" variant="red" style={{color:'white'}}>
                        <FontAwesomeIcon icon={['fas','ellipsis-h']} style={{color:'black'}} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="" >
                        <Dropdown.Item eventKey="1">
                          Download
                          <FontAwesomeIcon icon={['fas','download']} className="ml-3"  />
                        </Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  render(){

   return(

        <div className="textFamily " >

          <Container className="pb-5 mb-5"  >
            <Row className="">

              <Col md={9} className="pt-5 pl-md-5 pr-md-5"  style={{backgroundColor:'#f1f3f4'}}>
                <Row>
                  {this.renderImage(this.state.photo_url,this.state.album_name,this.state.release_date,this.state.composer_name)}
                </Row>
                <Row className="pt-5 d-none d-sm-block" >
                  <Table  responsive>
                    <thead>
                      <tr>
                        <th>
                          #
                        </th>
                        <th className="text-secondary" >

                        </th>
                        <th className="text-secondary" >
                          TITLE
                        </th>
                        <th className="text-secondary" >
                          ARTISTS
                        </th>
                        <th className="text-secondary" >

                        </th>
                      </tr>
                    </thead>
                    <tbody>

                    {this.state.album.map((view,index)=>{
                      return(

                        this.renderCardDesktop(view.artist_name,view.track_name,view.track_url,index,view.icon)

                      );
                    })}

                    </tbody>

                  </Table>
                  <hr></hr>
                </Row>
                <Row className="pt-5 d-block d-sm-none" >

                  {this.state.album.map((view,index)=>{
                    return(

                      this.renderCardMobile(view.artist_name,view.track_name,view.track_url,index,view.icon)

                    );
                  })}
                </Row>
              </Col>
              <Col md={3} className="" >

              </Col>
            </Row>
          </Container>
          <PlayBoard trackUrl={this.trackUrl} />
        </div>
    );

}

};

export default Album_play;
