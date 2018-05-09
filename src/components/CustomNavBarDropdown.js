import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'

class CustomNavBarDropdown extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    return(
      <div>
        <DropdownButton
          bsStyle='ehg-navbar-dropdown'
          title={this.props.title}
          key={this.props.key}
          id={this.props.id}
        >
          {this.props.children}
        </DropdownButton>
      </div>
    );
  }
}

export default CustomNavBarDropdown;
