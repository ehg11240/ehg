import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap'
import Img from 'react-image'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class ShowDisplayPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showKey: this.props.match.params.showKey,
      imageSrc: '',
      show: null,
      loading: true,
      editMode: false,
      editedDescription: ''
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('shows/' + this.state.showKey).once('value', snapshot => {
      if (snapshot.val() !== null) {
        this.setState({ show: snapshot.val() });

        const storageRef = firebaseApp.storage().ref('');
        storageRef.child(this.state.show.imagePath).getDownloadURL().then((url) => {
          this.setState({ imageSrc: url });
        })

        this.setState({ loading: false });

        // Admin edit mode - starting values
        this.setState({
          editedDescription: snapshot.val().description
        });
      } else {
        console.log('Show Key:', this.state.showKey);
        this.props.history.push('/404');
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.showKey !== this.state.showKey) {
      this.setState({ showKey: nextProps.match.params.showKey });
    }
  }

  deleteItem = (produceNotification) => {
    firebaseApp.database().ref('shows/' + this.state.showKey).remove();

    produceNotification('Show Deleted', 'Successfully', 'success');
  }

  applyUpdate = (produceNotification) => {
    firebaseApp.database().ref('gallery/' + this.state.showKey)
      .set({
        imagePath: this.state.show.imagePath,
        description: this.state.editedDescription
      });

      produceNotification('Update Applied', 'Successfully', 'success');
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user, produceNotification } = value;
          return (
            <div>
              <CustomNavBar />
              <Grid>
                { this.state.loading ? (
                  <div className='loading'>
                    <h1 className='noselect'>LOADING, PLEASE WAIT...</h1>
                  </div>
                ) : (
                  <div>
                    <Row className='gallery-page-main'>
                      <Col xs={12} md={8}>
                        <Img src={this.state.imageSrc} />
                      </Col>
                      <Col xs={12} md={4}>
                        <Row className='gallery-page-row-3'>
                          <p>{this.state.show.description}</p>
                        </Row>
                      </Col>
                    </Row>
                    { user !== null &&
                      <div className='gallery-page-edit'>
                        <Row>
                          <Col xs={6} md={6} mdOffset={3}>
                            <h1>ADMIN EDIT</h1>
                            <h2>(Leave fields empty to skip them)</h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Name</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Name'
                              onChange={event => this.setState({ editedName: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Description</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Description'
                              onChange={event => this.setState({ editedDescription: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Price</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Price'
                              onChange={event => this.setState({ editedPrice: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Size (in)</h3>
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Width'
                              onChange={event => this.setState({ editedWidth: event.target.value })}
                              />
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Height'
                              onChange={event => this.setState({ editedHeight: event.target.value })}
                              />
                          </Col>
                          <Col xs={2} md={1}>
                            <FormControl
                              type='text'
                              placeholder='Depth'
                              onChange={event => this.setState({ editedLength: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={2} mdOffset={3}>
                            <h3>Weight (lb)</h3>
                          </Col>
                          <Col xs={6} md={4}>
                            <FormControl
                              type='text'
                              placeholder='Weight'
                              onChange={event => this.setState({ editedWeight: event.target.value })}
                              />
                          </Col>
                        </Row>
                        <Row className='gallery-page-edit-final'>
                          <Col xs={4} md={2} mdOffset={3}>
                            <Button
                              bsStyle='danger'
                              onClick={() => this.deleteItem(produceNotification)}
                              >
                              Delete
                            </Button>
                          </Col>
                          <Col xs={8} md={4}>
                            <Button
                              bsStyle='warning'
                              onClick={() => this.applyUpdate(produceNotification)}
                              >
                              Apply Update
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    }
                  </div>
                )}
              </Grid>
              <Footer />
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default ShowDisplayPage;