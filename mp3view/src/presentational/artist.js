import React from 'react';
import axios from 'axios';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import Header from "./Header";
import Music from "../images/imageedit_1_2296999990.png";
import TrackList from "./track_list";
import ReactLoading from 'react-loading';

class Artists extends React.Component{
    state ={
        loading:true,
        artist_name:[],
        artist_id:[],
        artist_photo_url:[],

    }
    componentDidMount(): void {
        axios.get('artist')
            .then((res)=>{
                console.log(res.data);

                for (let i=0;i<res.data['value'].length;i++){
                    this.setState(prevState=>({

                        artist_id: prevState.artist_id.concat(res.data['value'][i]['a_id']),
                        artist_name:prevState.artist_name.concat(res.data['value'][i]['artist_name']),
                        artist_photo_url: prevState.artist_photo_url.concat(res.data['value'][i]['photo_url'])
                    }))
                }
            })
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
    listItem(name,key,album,url,al_id,type){
        return(

            <Col md={3} xs={6} key={key} className="mb-5 "  onClick={()=>this.handleCallback(al_id,type)} >
                <Card className=" text-left  border-0 shadow" >
                    < Image  src={url} className=" heightCard " rounded />
                </Card>
                <div className="text-left pt-3">
                    <p className="mb-0 small font-weight-bold">{name}</p>
                    <p className="mb-0 small font-weight-bold text-secondary">{album}</p>
                </div>
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
            <ReactLoading color={"red"} type={"spokes"} className="" height={667} width={375} />);
          </Row>
        </div>)
      }
        return(
            <div>
                <Header   url={Music} album={"/"} tag={'Collection'} />
                <Container>
                    <Row>
                        <Col md={8} className="justify-content-center pr-md-5 ml-md--5" >
                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Playlists
                                </h4>
                            </Row>
                            <Row>
                                {
                                    this.state.artist_name.map((value,index)=>{
                                            return(
                                                this.listItem("Best of "+value,this.state.artist_id[index]," ",this.state.artist_photo_url[index],
                                                    this.state.artist_id[index],"artist"
                                                )
                                            )
                                        }

                                    )
                                }

                                <p className="text-secondary small pt-md-4 pb-2 pb-md-0 ml-5" >COMING SOON...</p>
                            </Row>
                        </Col>
                        <Col md={4} className="">
                              <TrackList callback="/album_play" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Artists;
