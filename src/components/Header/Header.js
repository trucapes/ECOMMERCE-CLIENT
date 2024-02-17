import Navbottom from '../Nav/Nav-Links/NavLinks';
import Navtop from '../Nav/Container/Container';
import './Header.css'

const Header = ({profile}) => {
    return ( 
        <div className='header__container'>
            <Navtop profile={profile}/>
            <Navbottom />
        </div>
     );
}
 
export default Header;