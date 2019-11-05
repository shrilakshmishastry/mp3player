import React from 'react';
import {Col,Image} from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



class PlayBoard extends React.Component{

  state = {
    src:[

      "/static/tracks/[iSongs.info] 01 - Banda Nodu Pailwaan - Theme Song.mp3",
      "/static/tracks/[iSongs.info] 03 - Baaro Pailwaan.mp3"
    ],
    active:"/static/tracks/[iSongs.info] 03 - Baaro Pailwaan.mp3",
    indicator:0
  };
  componentDidMount(){

    console.log(this.props.trackUrl);
    var data = this.props.trackUrl;
      console.log(data[0]);
    for(let i =0;i<data.length;i++){
      console.log(i);
    }
  }
   onHandle=()=>{

  if(this.state.indicator<this.state.src.length){
    this.setState(prevState=>({
      indicator:prevState.indicator+1,
      active:this.state.src[this.state.indicator]
    }));
  }
  else{
    this.setState(prevState=>({
      indicator:0,
      active:this.state.src[this.state.indicator]
    }));
  }

  }
  onseeked(){

  }
  onForward=()=>{
    if(this.state.indicator<this.state.src.length-1){
      this.setState(prevState=>({
        indicator:prevState.indicator+1,
        active:this.state.src[this.state.indicator]
      }));
    }
    else{
      console.log("hello");
      this.setState(prevState=>({
        indicator:0,
        active:this.state.src[this.state.indicator]
      }));
    }
  }
  onBackword=()=>{
    if(this.state.indicator>0){
      this.setState(prevState=>({
        indicator:prevState.indicator-1,
        active:this.state.src[this.state.indicator]
      }));
    }
    else{
      console.log("data");
      this.setState(prevState=>({
        indicator:prevState.indicator+1,
        active:this.state.src[this.state.indicator]
      }));
    }
  }
    render(){
        return(
            <div className="container-fluid playBoard" >
                <div className="row" style={{
                    backgroundColor:'#f1f3f4'
                }}>
                    <Col md={3} className="d-flex flex-row">
                        <Image src="" alt="hello" />
                        <div className="d-flex flex-column ml-3">
                          <p className="mb-0">
                          hello
                          </p>
                          <p className="mb-0">
                          world
                          </p>
                        </div>
                    </Col>

                    <Col md={6}  className="d-flex flex-row" >
                      <FontAwesomeIcon icon={['fas','backward']} className='mt-3 mr-md-4'style={{fontSize:'25px'}} onClick={this.onBackword} />
                        <ReactAudioPlayer
                            src={this.state.active}
                            autoplay
                            controls
                            onSeeked={this.onseeked}
                            onEnded={this.onHandle}
                            className="heightplayCard"
                        />
                      <FontAwesomeIcon icon={['fas','forward']} className='mt-3 ml-md-4' style={{fontSize:'25px'}} onClick={this.onForward} />
                    </Col>

                    <Col md={3}>

                    </Col>
                </div>

            </div>
        );
    }
}

export default PlayBoard;
