import React from 'react';


class Logout extends React.Component{
  state = {
    loading:true
  };
  componentDidMount(){
    localStorage.clear();
  }
  render(){
    if(this.state.loading){
      setInterval( ()=> {
       this.setState({
         loading:false
       });
     }, 100);
     return(
       <div>
       </div>)
    }
    else{
      window.location = "/";
    }
  }
}
export default Logout;
