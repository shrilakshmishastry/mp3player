import React from 'react';
// import AsyncSelect from "react-select/async";
import axios from 'axios';





// component for search bar
class  SearchBar extends React.Component{
    state = {
        inputValue:' ',
        track:[ ]
    };


// fetch tracks from /track
    componentDidMount() {
        axios.get('track')
            .then((res)=>{
                const values = JSON.parse(res.data['tracks']);

                for (let i= 0;i<values.length;i++){
                    this.setState(prevState=>({
                        track: prevState.track.concat(values[i]['fields'])
                    }));
                }

            })
            .catch((error)=>{
                console.log(error)
            })
    }

    filterTrack = (inputText) =>{
        this.state.track.filter(i=>
            i['name'].toLowerCase().includes(inputText.toLowerCase())
        );

    };

    loadOptions = (inputText,callback) =>{
        setTimeout(()=>{
            callback(this.filterTrack(inputText));
        },1000);
    };

    handleInputChange = ({inputValue})=>{
        this.setState(inputValue);
        return inputValue;
    };

    render(){
        return(

        <div>

           Search bar


        </div>

    );
    }

};

export default SearchBar;
