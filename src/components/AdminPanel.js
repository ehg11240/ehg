import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import NotificationSystem from 'react-notification-system'

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputInstaPost: ''
    }
  }

  applySettings(produceNotification, setIntagramPost) {
    // Update instagram post
    if (this.state.inputInstaPost !== null && this.state.inputInstaPost !== '') {
      setIntagramPost(this.state.inputInstaPost);
    }

    // Produce notification
    produceNotification('Update Successful', 'Yay!', 'success');
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, logOut, produceNotification, setIntagramPost } = value;
          return user ? (
            <div>
              {/* <NotificationSystem ref={this.notificationSystem} /> */}
              <CustomNavBar />
              <div className='admin'>
                <h1>ADMIN PANEL</h1>
                <Grid className='admin-grid'>
                  <Row className='admin-row admin-row-first'>
                    <Col xs={6} md={4} mdOffset={2}>
                      <h4>Promoted Instagram Post</h4>
                    </Col>
                    <Col xs={6} md={4}>
                      <FormControl
                        type='text'
                        placeholder='URL (post address)'
                        onChange={event => this.setState({ inputInstaPost: event.target.value })}
                        />
                    </Col>
                  </Row>
                  <hr />
                  <Row className='admin-row-end'>
                    <Button
                      bsStyle='primary'
                      onClick={() => this.applySettings(produceNotification, setIntagramPost)}
                      >
                      Update
                    </Button>
                  </Row>
                </Grid>
              </div>
              <Footer />
            </div>
          ) : (
            <Redirect to='/' />
          )
        }}
      </Consumer>
    )
  }
}

export default AdminPanel;
