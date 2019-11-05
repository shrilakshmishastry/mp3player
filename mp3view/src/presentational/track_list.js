import React from 'react';
import axios from 'axios';
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";



class TrackList extends React.Component{
    state = {
        pk:[ ],
        tracks:[ ],
        album_name:[ ]
    };
    componentDidMount(): void {

        axios.get('track')
            .then((res)=>{
                const  Track = JSON.parse(res.data['tracks'])

                for (let i=0;i<Track.length;i++){
                    this.setState(prevState=>({
                            pk: prevState.pk.concat(Track[i]['pk']),
                            tracks:prevState.tracks.concat(Track[i]['fields']),
                            album_name: prevState.album_name.concat(res.data.album_name[i])
                        })
                    )
                }

            })
            .catch((error)=>{
                console.log(error)
            })
    }




    trackPrint(value,pk,album_name,link){

        return(
            <Link to={{
                pathname:link,
                state:{
                    key:pk,
                    type:'track'
                }
            }}  key={pk} >
                <div    >
                    <Card  className="border-0 pb-4"  >
                        <div className="d-flex flex-row " >
                            <FontAwesomeIcon  icon={['fas','play-circle']}  style={{fontSize:'30px'}} className="text-primary" />
                            <div className="d-flex flex-column">
                                <p className="pl-3 mb-0 font-weight-bold small text-dark" >{value}</p>
                                <p className="pl-3 mb-0 text-secondary small" >{album_name}</p>
                            </div>
                        </div>
                    </Card>
                </div>

            </Link>

        );
    }

    render(){
        return(
            <div className="pl-md-5">
                <Row className=" pl-3 ">
                    <h4 className="font-weight-bold pl-md-4 pb-3">
                        Top Music
                    </h4>
                </Row>
                {
                    this.state.tracks.map((value,index)=>(
                        this.trackPrint(value['name'],this.state.pk[index],this.state.album_name[index],this.props.callback)
                    ))
                }
            </div>

        );
    }
};

export default TrackList;
