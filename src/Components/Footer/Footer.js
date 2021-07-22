import styles from './Footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.section}>
        <ul>
          <li>
            email: info@squaremile.com
          </li>
          <li>
            phone: 0207 729 3744
          </li>
          <li>
            Square Mile Coffee Roasters<br/>
            Unit 13, Uplands Business Park,<br/>
            Blackhorse Lane,<br/>
            London<br/>
            E17 5QJ<br/>
          </li>
        </ul>
      </div>
      <div className={[styles.section, styles.middleSection].join(' ')}>
        <div className={styles.socialMedia}>
          <FontAwesomeIcon
            icon={faFacebook}
            className={styles.icon}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className={styles.icon}
          />
          <FontAwesomeIcon
            icon={faTwitter}
            className={styles.icon}
          />
          <FontAwesomeIcon
            icon={faYoutube}
            className={styles.icon}
          />
        </div>
        <ul>
          <li>
            &copy; Copyright 2021
          </li>
          <li>
            privacy policy
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Sign up to our newsletter!</h3>
        <p>
          To keep up to date with the latest news from Square Mile, subscribe to our newsletter. Please enter your details below.
        </p>
        <form className={styles.signup}>
          <input
            type='email'
            className={styles.signupInput}
            aria-label='email'
            placeholder='email'
          />
          <input
            type='button'
            value='Subscribe'
            className={styles.signupButton}
            aria-label='subscribe'
          />
        </form>
      </div>
    </div>
  )
}

export default Footer;
