import React from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import {Link} from "react-router-dom";

class TopAlbum extends React.Component{
  state = {
    img_url:[],
    id:[],
    date_release:[],
    category:[],
    name:[]
  };
  componentDidMount(){
    axios.get("top_album")
    .then((res)=>{
      console.log(res.data.value[0].img_url);
      let data = res.data.value;
      for(let i=0;i<data.length;i++){
        this.setState((prevState)=>({
          img_url:prevState.img_url.concat(data[i].img_url),
          id:prevState.id.concat(data[i].id),
          date_release:prevState.date_release.concat(data[i].date_release),
          category:prevState.category.concat(data[i].category),
          name:prevState.name.concat(data[i].name)
        }));
      }
      console.log(this.state);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
handleClick=(id)=>{
  this.props.history.push({
      pathname:'/album_play',
      state:{
          key:id,
          type:'album'
      }
  })
};

renderImage(id,img,category){
  return (
  <Button className="btn btn-primary" onClick={()=>this.handleClick('1')} >
  click
  </Button>);
}

  render(){
    return(
      <div>
      {this.renderImage()}
      </div>
    );
  }
}

export default TopAlbum;
