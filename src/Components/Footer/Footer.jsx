import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.section}>
        <ul>
          <li>email: info@octopuscoffee.com</li>
          <li>phone: 0123 456 7890</li>
          <li>
            Octopus Coffee Roasters
            <br />
            Unit 1, Business Park,
            <br />
            Unknown Road,
            <br />
            Glasgow
            <br />
            G1 1AB
            <br />
          </li>
        </ul>
      </div>
      <div className={[styles.section, styles.middleSection].join(" ")}>
        <div className={styles.socialMedia}>
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          </a>
          <a href="https://www.instagram.com">
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </a>
          <a href="https://www.twitter.com">
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          </a>
          <a href="https://www.youtube.com">
            <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
          </a>
        </div>
        <ul>
          <li>&copy; Copyright 2021</li>
          <li>privacy policy</li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Sign up to our newsletter!</h3>
        <p>
          To keep up to date with the latest news from Octopus, subscribe to our
          newsletter. Please enter your details below.
        </p>
        <form className={styles.signup}>
          <input
            type="email"
            className={styles.signupInput}
            aria-label="email"
            placeholder="email"
          />
          <input
            type="button"
            value="subscribe"
            className={styles.signupButton}
            aria-label="subscribe"
          />
        </form>
      </div>
    </div>
  );
}

export default Footer;
