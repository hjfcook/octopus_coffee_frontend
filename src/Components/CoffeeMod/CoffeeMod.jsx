import styles from './CoffeeMod.module.css';

import Button from '../Button/Button';

import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function CoffeeMod(props) {
  const defaults = (() => {
    if (typeof props.coffee !== 'undefined' ) {
      return props.coffee;
    } else {
      return {
        _id: '',
        name: '',
        continent: 'N/A',
        country: 'N/A',
        process: 'N/A',
        price: '',
        roast: 'Light',
        descriptors: ['', '', ''],
        description: ''
      };
    }
  })();

  const [coffeeName, setCoffeeName] = useState(defaults.name);
  const [coffeeContinent, setCoffeeContinent] = useState(defaults.continent);
  const [coffeeCountry, setCoffeeCountry] = useState(defaults.country);
  const [coffeeProcess, setCoffeeProcess] = useState(defaults.process);
  const [coffeePrice, setCoffeePrice] = useState(defaults.price);
  const [coffeeRoast, setCoffeeRoast] = useState(defaults.roast);
  const [coffeeDescriptor1, setCoffeeDescriptor1] = useState(defaults.descriptors[0]);
  const [coffeeDescriptor2, setCoffeeDescriptor2] = useState(defaults.descriptors[1]);
  const [coffeeDescriptor3, setCoffeeDescriptor3] = useState(defaults.descriptors[2]);
  const [coffeeDescription, setCoffeeDescription] = useState(defaults.description);

  const history = useHistory();

  const coffeeAction = () => {
    fetch(`http://localhost:3000/api/coffee/${defaults._id}`, {
      method: props.type === 'add' ? "POST" : 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: coffeeName,
        continent: coffeeContinent,
        country: coffeeCountry,
        process: coffeeProcess,
        price: coffeePrice,
        roast: coffeeRoast,
        description: coffeeDescription,
        descriptor1: coffeeDescriptor1,
        descriptor2: coffeeDescriptor2,
        descriptor3: coffeeDescriptor3
      }),
      credentials: 'include'
    }).then((res) => res.json())
      .then(res => {
        console.log(res);
        history.push('/admin');
        props.fetchData();
      });
  };

  return (
    <>
      <h1>{props.type} coffee</h1>
      <form className={styles.addCoffee} action="/api/coffee" method="POST" >
        <label htmlFor="name">Coffee name:</label>
        <input value={coffeeName} type="text" onChange={(e) => {setCoffeeName(e.target.value)}} name="name" className={styles.formElement} required />
        <label htmlFor="continent">Continent:</label>
        <select value={coffeeContinent} name="continent" onChange={(e) => {setCoffeeContinent(e.target.value)}} className={styles.formElement}>
          <option value="N/A">N/A (Blended)</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
        </select>
        <label htmlFor="country">Country:</label>
        <select value={coffeeCountry} onChange={(e) => {setCoffeeCountry(e.target.value)}} name="country" className={styles.formElement}>
          <option value="N/A">N/A (Blended)</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Åland Islands">Åland Islands</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Aruba">Aruba</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Bouvet Island">Bouvet Island</option>
          <option value="Brazil">Brazil</option>
          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
          <option value="Brunei Darussalam">Brunei Darussalam</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Islands">Cayman Islands</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Christmas Island">Christmas Island</option>
          <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cote D'ivoire">Cote D'ivoire</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="French Southern Territories">French Southern Territories</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guernsey">Guernsey</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-bissau">Guinea-bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
          <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Isle of Man">Isle of Man</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jersey">Jersey</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
          <option value="Korea, Republic of">Korea, Republic of</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macao">Macao</option>
          <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
          <option value="Moldova, Republic of">Moldova, Republic of</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Netherlands Antilles">Netherlands Antilles</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Pitcairn">Pitcairn</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russian Federation">Russian Federation</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Helena">Saint Helena</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
          <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia">Serbia</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syrian Arab Republic">Syrian Arab Republic</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
          <option value="Thailand">Thailand</option>
          <option value="Timor-leste">Timor-leste</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Viet Nam">Viet Nam</option>
          <option value="Virgin Islands, British">Virgin Islands, British</option>
          <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
          <option value="Wallis and Futuna">Wallis and Futuna</option>
          <option value="Western Sahara">Western Sahara</option>
          <option value="Yemen">Yemen</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </select>
        <label htmlFor="process">Process:</label>
        <select value={coffeeProcess} onChange={(e) => {setCoffeeProcess(e.target.value)}} name="process" className={styles.formElement}>
          <option value="N/A">N/A (Blended)</option>
          <option value="Honey">Honey</option>
          <option value="Natural">Natural</option>
          <option value="Pulped Natural">Pulped Natural</option>
          <option value="Washed">Washed</option>
        </select>
        <label htmlFor="price">Price:</label>
        <input value={coffeePrice} type="number" min="0" max="30" step="0.01" onChange={(e) => {setCoffeePrice(e.target.value)}} name="price" className={styles.formElement} /> 
        <label htmlFor="roast">Roast:</label>
        <select value={coffeeRoast} onChange={(e) => {setCoffeeRoast(e.target.value)}} name="roast" className={styles.formElement}>
          <option value='Light'>Light</option>
          <option value='Medium'>Medium</option>
          <option value='Medium-dark'>Medium-dark</option>
          <option value='Dark'>Dark</option>
        </select>
        <label htmlFor="descriptor1">Flavour descriptor 1:</label>
        <input value={coffeeDescriptor1} type="text" onChange={(e) => {setCoffeeDescriptor1(e.target.value)}} name="descriptor1" className={styles.formElement} />
        <label htmlFor="descriptor2">Flavour descriptor 2:</label>
        <input value={coffeeDescriptor2} type="text" onChange={(e) => {setCoffeeDescriptor2(e.target.value)}} name="descriptor2" className={styles.formElement} />
        <label htmlFor="descriptor3">Flavour descriptor 3:</label>
        <input value={coffeeDescriptor3} type="text" onChange={(e) => {setCoffeeDescriptor3(e.target.value)}} name="descriptor3" className={styles.formElement} />
        <label htmlFor="description">Description:</label>
        <textarea  value={coffeeDescription} type="text" onChange={(e) => {setCoffeeDescription(e.target.value)}} name="description" className={`${styles.formElement} ${styles.description}`} />
      </form>
      <div className={styles.buttonDiv}>
        {props.type === 'edit' ?
        <Button buttonClass='danger' onClick={() => history.push('/admin/delete/' + props.coffee._id)}>delete</Button>
        :
        <div></div>
        }
        <div className={styles.rightButtons}>
          <Button buttonClass='secondary' onClick={() => history.push('/admin')}>cancel</Button>
          <Button buttonClass='primary' onClick={coffeeAction} style={{'marginLeft': '0.5rem'}}>save</Button>
        </div>
      </div>
    </>
  );
}

export default CoffeeMod;