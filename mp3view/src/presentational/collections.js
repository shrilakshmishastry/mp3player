import  React from 'react';
import Header from "./Header";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import TrackList from "./track_list";
import axios from "axios";
import Music from './../images/imageedit_1_2296999990.png';


class Collection extends  React.Component{
    state ={
        track_name: [ ],
        al_key:[ ],
        album_name:[],
        photo_url:[],
        track_id:[],
        track_name_hindi:[],
        al_hindi_key:[],
        photo_url_hindi:[],
        track_id_hindi:[],
        album_name_hindi:[],
        al_english_key:[],
        al_english_name:[],
        photo_url_english:[],
        track_name_english: [],
        track_id_english: [],
        track_id_top_artist:[],
        track_name_top_artist:[],
        photo_url_top_artist:[],
        artist_name:[],
        artist_id:[],
        track_id_composer:[],
        track_name_composer:[],
        photo_url_composer:[],
        composer_name:[],
        composer_id:[]
    };

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
    componentDidMount(): void {
        axios.get("trending")
            .then((res)=> {


                for (let i=0;i<res.data['value'].length;i++){

                    this.setState(prevState=>({
                        track_name: prevState.track_name.concat(res.data['value'][i]['track_name']),
                        al_key: prevState.al_key.concat(res.data['value'][i]['al_id']),
                        album_name: prevState.album_name.concat(res.data['value'][i]['album_name']),
                        photo_url: prevState.photo_url.concat(res.data['value'][i]['photo_url']),
                        track_id: prevState.track_id.concat(res.data['value'][i]['t_id']),

                    }))
                }

                for (let i=0;i<res.data['h_value'].length;i++){
                    this.setState(prevState=>({
                        track_id_hindi: prevState.track_id_hindi.concat(res.data['h_value'][i]['t_id']),
                        track_name_hindi: prevState.track_name_hindi.concat(res.data['h_value'][i]['track_name']),
                        al_hindi_key: prevState.al_hindi_key.concat(res.data['h_value'][i]['al_id']),
                        album_name_hindi:prevState.album_name_hindi.concat(res.data['h_value'][i]['album_name']),
                        photo_url_hindi: prevState.photo_url_hindi.concat(res.data['h_value'][i]['photo_url'])
                    }))
                }
                  for (let i=0;i<res.data['e_value'].length;i++){
                    this.setState(prevState=>({
                        track_id_english: prevState.track_id_english.concat(res.data['e_value'][i]['t_id']),
                        track_name_english: prevState.track_name_english.concat(res.data['e_value'][i]['track_name']),
                        al_english_key: prevState.al_english_key.concat(res.data['e_value'][i]['al_id']),
                        al_english_name:prevState.al_english_name.concat(res.data['e_value'][i]['album_name']),
                        photo_url_english: prevState.photo_url_english.concat(res.data['e_value'][i]['photo_url'])
                    }))
                }
            for (let i=0;i<res.data['top_artist'].length;i++){
                    this.setState(prevState=>({
                        track_id_top_artist: prevState.track_id_top_artist.concat(res.data['top_artist'][i]['t_id']),
                        track_name_top_artist: prevState.track_name_top_artist.concat(res.data['top_artist'][i]['track_name']),
                        artist_id: prevState.artist_id.concat(res.data['top_artist'][i]['a_id']),
                        artist_name:prevState.artist_name.concat(res.data['top_artist'][i]['artist_name']),
                        photo_url_top_artist: prevState.photo_url_top_artist.concat(res.data['top_artist'][i]['photo_url'])
                    }))
                }
             for (let i=0;i<res.data['top_composer'].length;i++){
                    this.setState(prevState=>({
                        track_id_composer: prevState.track_id_composer.concat(res.data['top_composer'][i]['t_id']),
                        track_name_composer: prevState.track_name_composer.concat(res.data['top_composer'][i]['track_name']),
                        composer_id: prevState.composer_id.concat(res.data['top_composer'][i]['c_id']),
                        composer_name:prevState.composer_name.concat(res.data['top_composer'][i]['composer_name']),
                        photo_url_composer: prevState.photo_url_composer.concat(res.data['top_composer'][i]['photo_url'])
                    }))
                }


            })
            .catch((error)=>{
                console.log(error)
            })
    }


    render(){
        return(
            <div className="textFamily" >
                <Header   url={Music} album={"/albums"} tag={'Albums'} />
                <Container className="mt-5">
                    <Row>
                        <Col md={8} className="" >

                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Hollywood Albums
                                </h4>
                            </Row>
                            <Row className="pb-3 pl-3">
                                {
                                    this.state.track_name_english.map((value,index)=>{
                                        return(

                                             this.listItem(value,this.state.track_id_english[index],this.state.al_english_name[index],this.state.photo_url_english[index],this.state.al_english_key[index],'album')
                                        )
                                        }

                                    )
                                }
                            </Row>
                             <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Featured Artists
                                </h4>
                            </Row>
                            <Row className="pb-3 pl-3">
                                {
                                    this.state.track_name_top_artist.map((value,index)=>{
                                        return(

                                             this.listItem(" ",this.state.artist_id[index]+value,this.state.artist_name[index],this.state.photo_url_top_artist[index],this.state.artist_id[index],'artist')
                                        )
                                        }

                                    )
                                }
                            </Row>

                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Sandlewood Showups
                                </h4>
                            </Row>
                            <Row className="pb-3 pl-3">
                                {
                                    this.state.track_name.map((value,index)=>{
                                        return(

                                             this.listItem(value,this.state.track_id[index],this.state.album_name[index],this.state.photo_url[index],this.state.al_key[index],'album')
                                        )
                                        }

                                    )
                                }
                            </Row>
                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Blockbuster  Composers
                                </h4>
                            </Row>
                            <Row className="pb-3 pl-3">
                                {
                                    this.state.track_name_composer.map((value,index)=>{
                                        return(

                                             this.listItem(" ",this.state.composer_id[index],this.state.composer_name[index],this.state.photo_url_composer[index],this.state.track_id_composer[index],'composer')
                                        )
                                        }

                                    )
                                }
                            </Row>
                             <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Bollywood Mashups
                                </h4>
                            </Row>
                            <Row className="pb-3 pl-3">
                                {
                                    this.state.track_name_hindi.map((value,index)=>{
                                        return(

                                             this.listItem(value,this.state.track_id_hindi[index],this.state.album_name_hindi[index],this.state.photo_url_hindi[index],this.state.al_hindi_key[index],'album')
                                        )
                                        }

                                    )
                                }
                            </Row>

                        </Col>
                        <Col md={4} className="">
                            <TrackList callback="/album_play"   />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Collection;
