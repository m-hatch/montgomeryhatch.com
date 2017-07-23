import React from 'react';
import ScrollAnchor from './ScrollAnchor';

export default React.createClass({
  
  render: function() {

    // prepare links list
    const classList = "nav__link topnav__link"
      + ( this.props.animate ? " topnav__link--animate" : "" )  
      + ( this.props.toggleNav ? " topnav__link--open" : "" );
    const links =  this.props.navLinks ;
    const linksList = links.map(link => {
      return (
        <li className={"topnav__list-item" 
            + ( this.props.toggleNav ? " topnav__list-item--open" : "" )} 
            key={ link.name }>

          <ScrollAnchor  
            className={ classList } 
            to={ link.url } 
            animate={{ offset: -57, duration: 400 }} >
            { link.name }
          </ScrollAnchor>
          
        </li>
      )
    });

    return (
      <div ref={ this.props.navRef } className="nav">
        <nav className={"nav__inner l-font-smoothing" + (!this.props.showNav ? " nav__inner--hide" : "")}>

          <div className="l-wrapper">
            <span className="nav__title">
              <ScrollAnchor  
                className="nav__link"
                to="#" 
                animate={{ offset: 0, duration: 400 }} >
                { this.props.navTitle }
              </ScrollAnchor>
            </span>
            <span className="nav__icon" onClick={ this.props.onBtnClick }>&#9776;</span>
          </div>

          <div className="nav__wrapper">
            <ul className="topnav" id="topNav">
              { linksList }
            </ul>
          </div>

        </nav>
      </div>
    );
  }

});