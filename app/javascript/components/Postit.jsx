import React from "react"
import PropTypes from "prop-types"

import './Postit.scss'

class Postit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inEditMode: false,
      description: props.description,
      temporaryDescription: props.description
    }
  }

  handleDeleteClick = () => {
    if (!window.confirm(`Are you sure you want to delete this PostIt?\nDescription: ${this.props.description}`)) {
      return null
    }
    const authenticityToken = $('meta[name=csrf-token]').attr('content')
    let data = new URLSearchParams();
    data.append(`authenticity_token`, `${authenticityToken}`);

    const promise = fetch(`/postits/${this.props.id}`, {
      method: 'DELETE',
      body: data
    })
    window.location.href = '/'
  }

  handleEditClick = () => {
    this.setState({inEditMode: true})
  }

  handleEditChange = (e) => {
    console.log(e.target.value)
    this.setState({ temporaryDescription: e.target.value})
  }

  handleEditInputBlur = (e) => {
    this.input = e.target
  }

  handleEditCancel = () => {
    this.setState({
      inEditMode: false,
      temporaryDescription: this.state.description
    })
  }

  handleEditSave = () => {
    const val = this.input.value
    this.setState({
      description: val,
      inEditMode: false
    })

    const authenticityToken = $('meta[name=csrf-token]').attr('content')
    let params = new URLSearchParams();
    let value = new URLSearchParams();
    params.append(`authenticity_token`, `${authenticityToken}`);
    params.append(`description`, val);
    fetch(`/postits/${this.props.id}`, {
      method: 'PATCH',
      body: params
    })
  }

  componentDidUpdate = () => {
    if (this.state.inEditMode) {
      this.editInput.value = this.state.temporaryDescription
      this.editInput.focus()
    }
  }

  render () {
    const styles = {
      backgroundColor: this.props.color
    }

    if(this.state.inEditMode) {
      return (
        <React.Fragment>
          <div className="postit" style={styles}>
            <input
              onBlur={this.handleEditInputBlur}
              onChange={this.handleEditChange}
              className="h-50 w-100"
              ref={(input) => this.editInput = input}
              type="text"
            />
            <div className="d-flex justify-content-between mt-3">
              <i onClick={this.handleEditSave} className="far fa-check-square mr-5"></i>
              <i onClick={this.handleEditCancel} className="far fa-window-close"></i>
            </div>

            <div className="links w-100 d-flex justify-content-between pr-5">
              <div>
                <i className="fas fa-edit"></i>
              </div>
              <div onClick={this.handleDeleteClick}>
                <i className="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="postit" style={styles}>
          { this.state.description }
          <div className="links w-100 d-flex justify-content-between pr-5">
            <div onClick={this.handleEditClick}>
              <i className="fas fa-edit"></i>
            </div>
            <div onClick={this.handleDeleteClick}>
              <i className="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Postit.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default Postit
