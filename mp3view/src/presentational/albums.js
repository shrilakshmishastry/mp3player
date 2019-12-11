import  React from 'react';
import Header from "./Header";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import TrackList from "./track_list";
import axios from "axios";
import Music from './../images/imageedit_1_2296999990.png';
import ReactLoading from 'react-loading';


class Albums extends  React.Component{
    state ={
        loading:true,
        albums : [ ],
        key:[ ],
        comp_name:[]
    };

    componentDidMount(): void {
        axios.get("album")
            .then((res)=>{

                const result = JSON.parse(res.data['albums']);

                let name = [];
                for(let i=0;i<result.length;i++){

                    name =name.concat(result[i]['fields']['name'])

                }
                let  al =[];
                for (let i=0;i<res.data.a_name.length;i++){
                    let  index=name.indexOf(res.data.a_name[i]);

                    if(!al.includes(res.data.a_name[i])){
                        al =  al.concat(res.data.a_name[i]);
                        this.setState(prevState=>({
                            albums: prevState.albums.concat(result[index]['fields']),
                            key: prevState.key.concat(result[index]['pk']),
                            comp_name: prevState.comp_name.concat(res.data.c_name[i])
                        }));
                    }}


            })
            .catch((error)=>{
                console.log(error)
            })
    }
 handleClick(key,type){
        this.props.history.push({
            pathname:'/album_play',
            state:{
                key:key,
                type:'album'
            }
        })
    }

    listItem(name,key,composer,url,type){
        return(

            <Col md={3} xs={6} key={key} className="mb-5 "  onClick={()=>this.handleClick(key,type)} >
                <Card className=" text-left  border-0 shadow" >
                    < Image  src={url} className=" heightCard " rounded />
                </Card>
                <div className="text-left pt-3">
                    <p className="mb-0 small font-weight-bold">{name}</p>
                    <p className="mb-0 small font-weight-bold text-secondary">{composer}</p>
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
            <div className="textFamily" >
                <Header   url={Music} album={"/"} tag={'Collection'} />
                <Container className="mt-5">
                    <Row>
                        <Col md={8} className="justify-content-center pr-md-5 ml-md--5">
                              <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                   Evergreen Romance
                                </h4>
                            </Row>
                            <Row>
                                {
                                    this.state.albums.map((value,index)=>{
                                        if(value['category']==="Romance") {
                                            return(
                                                this.listItem(value['name'],this.state.key[index],this.state.comp_name[index],value['img_url'],'album')
                                            )
                                        }
                                        return("");
                                    }
                                    )
                                }
                                 <p className="text-secondary small pt-md-4 pb-2 pb-md-0 ml-5" >COMING SOON...</p>
                            </Row>
                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Partyholics
                                </h4>
                            </Row>
                            <Row>
                                {
                                    this.state.albums.map((value,index)=>{
                                        if(value['category']==="Music") {
                                            return(
                                                this.listItem(value['name'],this.state.key[index],this.state.comp_name[index],value['img_url'])

                                            )
                                        }
                                        return("");
                                   }

                                    )
                                }
                                <p className="text-secondary small pt-md-4 pb-2 pb-md-0 ml-5" >COMING SOON...</p>
                            </Row>
                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold ">
                                   Melodramatic
                                </h4>
                            </Row>
                            <Row>

                                {
                                    this.state.albums.map((value,index)=>{
                                        if(value['category']==="Emotion") {
                                            return(
                                                this.listItem(value['name'],this.state.key[index],this.state.comp_name[index],value['img_url'])
                                            )
                                        }
                                        return("");
                                     }
                                    )
                                }
                                 <p className="text-secondary small pt-md-4 pb-2 pb-md-0 ml-5" >COMING SOON...</p>
                            </Row>
                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                    Music in Decades
                                </h4>
                            </Row>
                            <Row>

                                {
                                    this.state.albums.map((value,index)=>{
                                        if(value['category']==="MUSIC IN DECADES") {
                                            return(
                                                this.listItem(value['name'],this.state.key[index],this.state.comp_name[index],value['img_url'])
                                            )
                                        }
                                        return("");
                                     }
                                    )
                                }
                                <p className="text-secondary small pt-md-4 pb-2 pb-md-0 ml-5" >COMING SOON...</p>
                            </Row>
                            <Row className="pb-3 pl-3">
                                <h4 className="font-weight-bold">
                                   Rhythm and blues
                                </h4>
                            </Row>
                            <Row>
                                {
                                    this.state.albums.map((value,index)=>{
                                        if(value['category']==="Rhythm and blues") {
                                            return(
                                                this.listItem(value['name'],this.state.key[index],this.state.comp_name[index],value['img_url'])
                                            )
                                        }
                                        return("");
                                     }
                                    )
                                }
                                  <p className="text-secondary small pt-2 pt-md-4  ml-5" >COMING SOON...</p>
                            </Row>
                        </Col>
                        <Col md={4} >
                            <TrackList callback="/album_play" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}





export default Albums;
