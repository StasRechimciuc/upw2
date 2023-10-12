import PngIcons from "../assets/icons/PngIcons";
import SvgIcons from "../assets/icons/SvgIcons";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div id="Footer">
      {/* <div className="first">
        <div>
          <img src={PngIcons.MainLogo} />
        <p>
          Live scores service at TheyScored livescore offers sports live scores,
          results and tables. Follow your favourite teams right here live! Live
          score is automatically updated and you don't need to refresh it
          manually.
        </p></div>
        <span>
        ©TheyScored All rights reserved.
        </span>
      </div>
      <div className="second">
        <h3>Top 10 upcoming games</h3>
        <div>



        </div>
      </div>
      <div className="third"></div> */}

      <footer className="footer">
        <div className="footer-left col-md-4 col-sm-6">
          <h2>
            <img src={PngIcons.MainLogo} />
          </h2>
          <p className="about">
            Live scores service at TheyScored livescore offers sports live
            scores, results and tables. Follow your favourite teams right here
            live! Live score is automatically updated and you don't need to
            refresh it manually
          </p>
          <p className="name"> ©TheyScored All rights reserved.</p>
        </div>
        <div className="footer-right col-md-4 col-sm-6">
          <div className="heading">Top 10 upcoming games</div>

          <p className="menu">
            <a href="#"> Mallorca - Barcelona</a> |
            <a href="#"> Monaco Basket - Saint-Quentin</a> |
            <a href="#"> Struff J. - Ruud C.</a> |
            <a href="#"> Carolina Hurricanes - Tampa Bay Lightning</a> |
            <a href="#"> Tampa Bay Buccaneers - Philadelphia Eagles</a>
            <a href="#"> Liverpool - Leicester City</a>|
            <a href="#"> Juventus - Lecce</a> |
            <a href="#"> de Minaur A. - Murray A.</a> |
            <a href="#"> Manchester United - Crystal Palace</a> |
            <a href="#"> Newcastle United - Manchester City</a> |
          </p>
        </div>
        <div className="footer-center col-md-4 col-sm-6">
          <div className="heading">Links</div>
          <div className="Ano-Links">
            <div>Contact</div>
            <div>About</div>
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
            <div>Cookie Policy</div>
          </div>
          <div className="my-cons">
            <SvgIcons.fb /> <SvgIcons.Insta /> <SvgIcons.Tiktok />{" "}
            <SvgIcons.Twitter />
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
