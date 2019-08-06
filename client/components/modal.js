import React, {Component} from 'react'

export default class modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleClass: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let currentState = false
    this.setState({toggleClass: currentState})
    this.props.history.push('/products')
  }
  render() {
    return (
      <div>
        {this.state.toggleClass && (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
              <img
                src="https://imgur.com/jobpqsP.png"
                alt=""
                onClick={this.handleClick}
              />
            </div>
            {/* <button
              type="button"
              className="modal-close is-large"
              aria-label="close"
              onClick={this.handleClick}
            >
              Yes, I am
            </button> */}
          </div>
        )}
      </div>
    )
  }
}
