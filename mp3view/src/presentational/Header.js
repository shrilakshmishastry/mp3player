import  React from 'react';
import {Button, Col, Jumbotron, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";


const Header = ({album,url,tag})=>{
    return (

        <Jumbotron  className=" pt-0 pb-0" style={{backgroundColor:'#d8d2cb'}} >
            <Row className="">
                <Col className="d-block d-sm-none">
                    <img src={`${url}`} className="img-fluid" alt=""/>
                </Col>
                <Col md={1}>
                </Col>
                  <Col md={5} className="pt-3 text-center d-block d-sm-none pb-5">
                    <h4 className="font-weight-bold text-light  pt-5 mt-md-5" >The Killers</h4>
                    <h1 className="font-weight-bold text-light">Land of The Music</h1>
                    <Button  size="lg" className="buttonBorder pr-md-5 pl-md-5 mt-4"  variant="dark"  >
                        {tag}
                       <FontAwesomeIcon  icon={['fas','play']} className="ml-4"  />
                    </Button>
                </Col>
                <Col className="pt-md-5 d-none d-sm-block">
                    <h4 className="font-weight-bold text-light  pt-5 mt-md-5" >The Killers</h4>
                    <h1 className="font-weight-bold text-light">Land of The Music</h1>
                    <Link to={{
                        pathname:album

                    }}>
                    <Button  size="lg" className="buttonBorder pr-md-5 pl-md-5 mt-4 "  variant="dark"  >
                        {tag}


                       <FontAwesomeIcon  icon={['fas','play']} className="ml-4"  />
                    </Button>
                    </Link>
                </Col>
                <Col md={6} className="d-none d-sm-block ">
                    <img src={`${url}`} className="img-fluid" alt=""/>
                </Col>
            </Row>
        </Jumbotron>

    );
};

export default Header;