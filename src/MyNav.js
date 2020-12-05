import React from 'react';

class MyNav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
            </ul>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.props.handleDrawerToggle}>
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>

          <div className="navbar-wrapper">
            {/*eslint-disable-next-line*/}
            <a className="navbar-brand">{this.props.selected}</a>
          </div>

        </div>
      </nav>
    )
  }
}

export default MyNav;
