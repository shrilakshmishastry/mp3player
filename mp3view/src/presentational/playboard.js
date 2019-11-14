import React from 'react';
import {Col,Image} from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



class PlayBoard extends React.Component{

  state={
      active:"",
      indicator:0,
      album_name:" "
    };
    src=[];



  componentDidMount(){

    var data = this.props.trackUrl;

    for(let i=0;i<data.length;i++){
        this.src.push(data[i])
    };

    this.setState({
      active:data[0],
      album_name:this.props.album_name
    });

  }

  handleChange(index){

    this.setState({
      active:this.src[index],

    });
  }

   onHandle=()=>{

  if(this.state.indicator<this.src.length){
    this.setState(prevState=>({
      indicator:prevState.indicator+1,
      active:this.src[this.state.indicator]
    }));
  }
  else{
    this.setState(prevState=>({
      indicator:0,
      active:this.src[this.state.indicator]
    }));
  }

  }
  onseeked(){

  }
  onForward=()=>{

    if(this.state.indicator<this.src.length-1){

      this.setState(prevState=>({
        indicator:prevState.indicator+1,
        active:this.src[this.state.indicator]
      }));
    }
    else{

      this.setState(prevState=>({
        indicator:0,
        active:this.src[this.state.indicator]
      }));
    }
  }
  onBackword=()=>{

    if(this.state.indicator>0){
      this.setState(prevState=>({
        indicator:prevState.indicator-1,
        active:this.src[this.state.indicator]
      }));
    }
    else{

      this.setState(prevState=>({
        indicator:this.src.length-1,
        active:this.src[this.state.indicator]
      }));
    }
  }
    render(){
        return(
            <div className="container-fluid playBoard" >
                <div className="row" style={{
                    backgroundColor:'#f1f3f4'
                }}>
                    <Col md={3} className="d-flex flex-row pt-3 pt-md-0">
                        <Image src={this.props.photo_url} style={{width:'50px',height:'50px'}} className="ml-5  ml-md-0" />
                        <div className="d-flex flex-column ml-5 ml-md-3">
                          <p className="mb-0 font-weight-bold ">
                            {this.state.album_name}
                          </p>
                          <p className="mb-0 font-weight-bold text-secondary">
                          {this.props.composer_name}
                          </p>
                        </div>
                    </Col>

                    <Col md={6}  className="d-flex flex-row" >
                      <FontAwesomeIcon icon={['fas','backward']} className='mt-3 mr-md-4'style={{fontSize:'25px'}} onClick={this.onBackword} />
                        <ReactAudioPlayer
                            src={this.state.active}
                            autoplay={true}
                            controls
                            onSeeked={this.onseeked}
                            onEnded={this.onHandle}
                            className="heightplayCard"

                        />
                      <FontAwesomeIcon icon={['fas','forward']} className='mt-3 ml-md-4' style={{fontSize:'25px'}} onClick={this.onForward} />
                    </Col>
                    
                    <Col md={3}>
                      <p className="font-weight-bold mt-md-3 text-center " >
                        {this.state.active.substring(15)}
                      </p>
                    </Col>
                </div>

            </div>
        );
    }
};

export default PlayBoard;
