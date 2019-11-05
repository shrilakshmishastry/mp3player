import React from 'react';
import NavBar from "./presentational/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Home from "./components/home";
import {far} from '@fortawesome/free-regular-svg-icons';


library.add(fab,fas,far);


export default class App extends React.Component{
    render() {
        return(
            <div>
                <NavBar/>
                <Home/>

            </div>
        );
    }

}
