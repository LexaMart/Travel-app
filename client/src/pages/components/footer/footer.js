import React from 'react';
import 'materialize-css';
import './footer.css';

export const Footer = () => {
    return (
        <footer className="page-footer" id="footer_id">
          <div className="container footer_inf">
          <a href="https://rs.school/js/"><img className='course_logo' alt = "rsschool" src="https://rs.school/images/rs_school_js.svg"></img></a>
          <a className="white-text right link" href="https://github.com/Nerbet">Nerbet</a>
          <a className="white-text right linkk" href="https://github.com/LexaMart">LexaMart</a>
          <div className="white-text right year">2021</div>
          </div>
      </footer>
    )
   }