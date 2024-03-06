import Control from '../Controls/Control';
import DrawerNav from '../DrawerNav/DrawerNav';
import NavBrand from '../Nav-Brand/Navbrand';
import Form from '../Search-Bar/Form';
import './Container.css'

const Navtop = ({profile, isAuthenticated}) => {
    return ( 
            <div className="nav__top__container">
                <div className="top__container">
                    <NavBrand />
                    <div className="form__container">
                        <Form />
                    </div>
                    <div className="control__bar">
                        <Control profile={profile} isAuthenticated={isAuthenticated} />
                    </div>
                    <div className="drawer">
                        <DrawerNav profile={profile} />
                    </div>
                </div>
            </div>
     );
}
 
export default Navtop;