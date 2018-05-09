import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Footer extends Component {
  render () {
    return(
      <Grid fluid>
        <Row className='footer'>
          <Col xs={12} md={6}>
            <h1 className='noselect'>EUCALYPTUS HILLS GALLERY</h1>
            <p>11240 MANZANITA RD</p>
            <p>LAKESIDE, CA 92040</p>
            <p>{this.props.email}</p>
            <p>{this.props.phone}</p>
          </Col>
          <Col xs={12} md={6}>
            <Col xs={6} md={6}>
              <h2 className='noselect'>ARTISTS</h2>
              <h3>MICHAEL ROSER</h3>
              <Link to='/artists/michael-roser/gallery'><h4>GALLERY</h4></Link>
              <Link to='/artists/michael-roser/about'><h4>ABOUT</h4></Link>
              <Link to='/artists/michael-roser/contact'><h4>CONTACT</h4></Link>
              <h3>FRED BRISCOE</h3>
              <Link to='/artists/fred-briscoe/gallery'><h4>GALLERY</h4></Link>
              <Link to='/artists/fred-briscoe/about'><h4>ABOUT</h4></Link>
              <Link to='/artists/fred-briscoe/contact'><h4>CONTACT</h4></Link>
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Footer;
