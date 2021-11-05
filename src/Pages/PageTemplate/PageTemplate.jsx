import styles from './PageTemplate.module.css';
import Header from '../../Components/Header/Header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

function PageTemplate(props) {
  return (
    <div className={styles.page}>
      <Header />
        <div className={styles.middleBlock}>
            {props.children}
        </div>
      <Footer />
    </div>
  );
}

export default PageTemplate;