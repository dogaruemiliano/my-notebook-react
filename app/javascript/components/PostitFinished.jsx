import React from "react"
import PropTypes from "prop-types"

import './Postit.scss'

class Postit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inEditMode: false,
      description: props.postit.description,
      temporaryDescription: props.postit.description
    }
  }

  handleDeleteClick = () => {
    const authenticityToken = $('meta[name=csrf-token]').attr('content')
    let data = new URLSearchParams();
    data.append(`authenticity_token`, `${authenticityToken}`);
    // data.append(`id`, `${this.props.postit.id}`);
    // const data = JSON.stringify({"authenticityToken": authenticityToken, id: `${this.props.postit.id}`})
    console.log(data)
    const promise = fetch(`/postits/${this.props.postit.id}`, {
      method: 'DELETE',
      body: data
    })
    window.location.href = '/'
    // .then(response => response.json())
    // this.setState({deleted: true})

  }

  handleEditClick = () => {
    this.setState({inEditMode: true})
  }

  handleEditChange = (e) => {
    console.log(e.target.value)
    this.setState({ temporaryDescription: e.target.value})
  }

  handleEditInputBlur = (e) => {
    const val = e.target.value
    console.log(val)
    this.setState({
      description: val,
      inEditMode: false
    })

    // const authenticityToken = $('meta[name=csrf-token]').attr('content')
    // let params = new URLSearchParams();
    // let value = new URLSearchParams();
    // params.append(`authenticity_token`, `${authenticityToken}`);
    // // Should edit postit_params inside PostitController
    // params.append(`description`, val);
    // console.log(params)
    // const promise = fetch(`/postits/${this.props.postit.id}`, {
    //   method: 'PATCH',
    //   body: params
    // })
  }

  componentDidUpdate = () => {
    if (this.state.inEditMode) {
      this.editInput.value = this.state.temporaryDescription
      this.editInput.focus()
    }
  }

  render () {
    const styles = {
      backgroundColor: this.props.postit.color
    }

    // if (this.state.deleted) {
    //   return null
    // }

    if(this.state.inEditMode) {
      return (
        <React.Fragment>
          <div className="postit" style={styles}>
            <input
              onBlur={this.handleEditInputBlur}
              onChange={this.handleEditChange} // needed to not be a read only input
              ref={(input) => this.editInput = input}
              type="text"
            />
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

// Postit.propTypes = {
//   postit: PropTypes.object.required
// };
export default Postit
