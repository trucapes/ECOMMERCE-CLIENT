import "./Footer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Container, Grid } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        {/* <div className="footer__items__container">
          <div className="footer__help__container">
            <div className="footer__help__header">
              <h1>Help</h1>
            </div>
            <ul className="fotter__help__links">
              <li className="help__link">
                <a href="/"> Shipping</a>
              </li>
              <li className="help__link">
                <a href="/">Refund</a>
              </li>
              <li className="help__link">
                <a href="/">FAQ</a>
              </li>
              <li className="help__link">
                <a href="/">Accessiblity</a>
              </li>
            </ul>
          </div>
          <div className="footer__contact__container">
            <div className="footer__contact__header">
              <h1>Contact Us</h1>
            </div>
            <ul className="footer__contacts">
              <li className="footer__contact">
                <LocalPhoneIcon /> <span>+123 4567 890</span>
              </li>
              <li className="footer__contact">
                <EmailIcon /> <span>shop@truscapes.com</span>
              </li>
              <li className="footer__contact">
                <LocationOnIcon /> <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
          <div className="footer__social__link__container">
            <div className="footer__social__link__header">
              <h1>Stay Connected</h1>
            </div>
            <ul className="footer__social__links">
              <li className="social__link">
                <TwitterIcon />
              </li>
              <li className="social__link">
                <InstagramIcon />
              </li>
              <li className="social__link">
                <YouTubeIcon />
              </li>
              <li className="social__link">
                <TelegramIcon />
              </li>
              <li className="social__link">
                <PinterestIcon />
              </li>
            </ul>
          </div>
        </div> */}
        <div className="fotter__copyright__container">
          <div>Copyright © 2024 tru-scapes.com, All rights reserved.</div>
          <ul className="nav">
            <li className="footer__terms__condition">
              {" "}
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="https://tru-scapes.com/refund_returns/"
              >
                Refund & Returns Policy
              </a>{" "}
              |
            </li>
            <li className="footer__privacy__policy">
              |{" "}
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="https://tru-scapes.com/privacy-policy/"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        {/* <Container maxWidth={"lg"}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              Copyright © 2023 tru-scapes.com, All rights reserved.
            </Grid>
            <Grid xs={6} sx={{display:"flex", justifyContent: "flex-end", }}>
              Copyright © 2023 tru-scapes.com, All rights reserved.
            </Grid>

          </Grid>
        </Container> */}
      </div>
    </footer>
  );
};

export default Footer;
