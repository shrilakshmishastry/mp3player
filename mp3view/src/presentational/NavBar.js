import React,{useState,useEffect} from 'react';
// import axios from 'axios';
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SearchBar from "./Searchbar";
import axios from 'axios';

const NavBar = ()=>{
  const [name,setName] = useState(" ");

  useEffect(()=>{
    if(localStorage.getItem('token')!==null){
      setLogin(true);
      axios.get('signin',{
        params:{
        token:localStorage.getItem('token')
      }
      })
      .then((res)=>{

        let data = res.data['value']
        setName(data);
      })
      .catch((err)=>{

      })
    }
  });
  const[login,setLogin] = useState(false);

  if(login){
    return(
        <div className="textFamily" >
            <Navbar className="" expand="lg">
                <Navbar.Brand href="/">
                    <FontAwesomeIcon icon={['fab',"soundcloud"]}  style={{color:'black',fontSize:55}} />

                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbartop"/>
                <Navbar.Collapse id="navbartop" className="" >
                    <Nav className="mr-auto font-weight-bold">
                        <Nav.Link href="/" className="pl-5">
                            Collection
                        </Nav.Link>
                        <Nav.Link href="/albums" className="pl-5">
                            Albums
                        </Nav.Link>
                        <Nav.Link  href='/artists' className="pl-5">
                            Artists
                        </Nav.Link>

                    </Nav>
                    <div className="d-none d-sm-block" >
                        <SearchBar/>
                    </div>
                    <Nav className="ml-auto font-weight-bold">
                        <Nav.Link href='/favorite' className="pl-5">
                            Favorite
                        </Nav.Link>

                        <Nav.Link  className="pl-5 text-dark font-weight-bold">
                        Hello {name} !!
                        </Nav.Link>
                        <Nav.Link href="/logout" className="pl-5 "  >
                          Logout
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="d-block d-sm-none">
                <SearchBar/>
            </div>
        </div>

    );
  }
  else{
    return(
        <div className="textFamily" >
            <Navbar className="" expand="lg">
                <Navbar.Brand href="/">
                    <FontAwesomeIcon icon={['fab',"soundcloud"]}  style={{color:'black',fontSize:55}} />

                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbartop"/>
                <Navbar.Collapse id="navbartop" className="" >
                    <Nav className="mr-auto font-weight-bold">
                        <Nav.Link href="/" className="pl-5">
                            Collection
                        </Nav.Link>
                        <Nav.Link href="/albums" className="pl-5">
                            Albums
                        </Nav.Link>
                        <Nav.Link  href='/artists' className="pl-5">
                            Artists
                        </Nav.Link>

                    </Nav>
                    <div className="d-none d-sm-block" >
                        <SearchBar/>
                    </div>
                    <Nav className="ml-auto font-weight-bold">
                        <Nav.Link href='/favorite' className="pl-5">
                            Favorite
                        </Nav.Link>

                        <Nav.Link href="/signin" className="pl-5">
                            Sign in
                        </Nav.Link>


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="d-block d-sm-none">
                <SearchBar/>
            </div>
        </div>

    );
  }

};

export default NavBar;
