import React from  'react';
// importing presentational components for home component
import Collections from  './../presentational/collections.js';
import Albums  from "../presentational/albums.js";
import Artists  from "../presentational/artist.js";
import {Route, Switch} from "react-router";
import Favorite from "./favorite";
import Album_play from "./album_play";
import SignIn from "../presentational/signIn";
import Signup from "../presentational/signup";
import TrackList from "../presentational/track_list";
import Logout from '../presentational/logout.js';



// routers for varoius component
const  Home = ()=>{

    return(
         <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/albums" component={Albums}/>
                <Route path="/artists" component={Artists}/>
                <Route path="/favorite" component={Favorite} />
                <Route path="/album_play" component={Album_play}/>
                <Route path="/tracks"  component={TrackList}   />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={Signup} />
                <Route path="/" component={Collections} />
            </Switch>
    );
};

export  default Home;
