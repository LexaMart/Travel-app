import React from 'react';
import 'materialize-css';
import './footer.css';

export const Footer = () => {
    return (
        <footer class="page-footer" id="footer_id">
          <div class="container footer_inf">
          <a href="https://rs.school/js/"><img class='course_logo' alt = "rsschool" src="https://rs.school/images/rs_school_js.svg"></img></a>
          <a class="white-text right link" href="https://github.com/Nerbet">Nerbet</a>
          <a class="white-text right linkk" href="https://github.com/LexaMart">LexaMart</a>
          <div class="white-text right year">2021</div>
          </div>
      </footer>
    )
   }