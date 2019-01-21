import React from 'react'
import "./HeaderMenu.css"



class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      scoreboard: []
    };

    this.HamburgerMenu = this.HamburgerMenu.bind(this);
  }

  HamburgerMenu() {
    // Todo: add change class to bar* for animation
    return (
      <div className="hamburgerMenu" onClick={() => this.toggleMenu()}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    );
  }

  toggleMenu() {
    if(this.state.expanded) {
      document.getElementById('side-menu').style.width = '0%';
      this.setState({expanded: false});
    }
    else {
      document.getElementById('side-menu').style.width = '50%';
      this.setState({expanded: true});
    }
  }

  CancelBtn(props) {
    return (
      <svg
        width="22"
        height="22"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        enable-background="new 0 0 64 64"
        onClick={props.onClick}
        style={{cursor: "pointer"}}
      >
        <g>
          <path fill="#1D1D1B" d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z" />
        </g>
      </svg>);
  }

  render() {
    return (
      <div>
        <div className="headerMenu">
          <div className="innerHeaderMenu">
            <this.HamburgerMenu />
            <p>{this.props.text}</p>
            <p>{this.props.timeLeft}</p>
          </div>
        </div>
        <div className="expanedMenu" id="side-menu">
          {/* <p onClick={() => this.toggleMenu()}>{this.props.text}</p> */}
          <p>Settings</p>
          <this.CancelBtn onClick={() => this.toggleMenu()} />
          <h3>Scoreboard</h3>
          <h4>Round 2</h4>
          <p>2 Yusuf</p>
        </div>
      </div>
    );
  }
}

export default HeaderMenu;
