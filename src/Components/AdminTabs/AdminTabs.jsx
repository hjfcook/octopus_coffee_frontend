import styles from "./AdminTabs.module.css";
import { useLocation, Link } from "react-router-dom";

function AdminTabs() {
  const location = useLocation();
  const tabs = ["Coffee", "Equipment", "Merchandise", "Users"];

  return (
    <div className={styles.tabContainer}>
      <ul className={styles.tabs}>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={
              location.pathname === `/admin/${tab.toLowerCase()}`
                ? styles.selectedTab
                : null
            }
          >
            <Link to={`/admin/${tab.toLowerCase()}`}>{tab}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// function AdminTabs() {
//   const history = useHistory();
//   const location = useLocation();
//   const tabs = ["Coffee", "Equipment", "Merchandise", "Users"];

//   return (
//     <div className={styles.tabContainer}>
//       <ul className={styles.tabs}>
//         {tabs.map((tab) => (
//           <li
//             key={tab}
//             onClick={() => {
//               history.push(`/admin/${tab.toLowerCase()}`);
//             }}
//             className={
//               location.pathname === `/admin/${tab.toLowerCase()}`
//                 ? styles.selectedTab
//                 : null
//             }
//           >
//             {tab}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default AdminTabs;
