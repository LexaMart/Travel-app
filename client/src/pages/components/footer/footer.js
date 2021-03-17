import React from 'react';
import 'materialize-css';
import './footer.css';

export const Footer = () => {
  return (
    <footer className="page-footer" id="footer_id">
      <div className="container footer_inf">
        <a href="https://rs.school/js/"><img className='course_logo' alt="rsschool" src="https://rs.school/images/rs_school_js.svg"></img></a>
        <div className="white-text year">2021</div>
        <div className="links">
          <a className="white-text us" href="https://github.com/Nerbet">Nerbet</a>
          <a className="white-text us" href="https://github.com/LexaMart">LexaMart</a>
        </div>
        <a className="red-text youtube" href="https://youtu.be/nydxkjtA4iU">Youtube</a>
      </div>
    </footer>
  )
}
