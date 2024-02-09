import "./MyAccount.css";
import { Link } from "react-router-dom";

const Buttons = ({ title, to, active }) => {
  return (
    <Link to={to}>
      <div
        className={`user-info-btns w-fit ${
          active ? "border-b-4 border-b-blue-600  text-blue-600" : ""
        } text-center font-semibold px-3 py-1 relative`}
      >
        {title}
      </div>
    </Link>
  );
};

const MyAccount = (props) => {
  return (
    <>
      <div className="account-container p-3 bg-slate-200">
        <div className="account-header bg-[#ffe26e] flex flex-col sm:flex-row rounded-t-lg p-[25px]">
          <div className="profile-container rounded-2xl overflow-hidden w-full sm:w-52 aspect-square">
            <img
              src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
              alt=""
            />
          </div>
          <div className="detail-container px-2 sm:py-2 py-4 sm:px-4 flex flex-col justify-between">
            <div className="user-name font-bold">
              <h1>John Deer</h1>
            </div>
            <div className="user-role text-[16px] text-slate-700 font-bold">
              Role : Admin
            </div>
            <div className="user-email text-[16px] text-slate-700 font-bold">
              Email : Y7TtZ@example.com
            </div>
            <div className="user-status text-[16px] text-slate-700 font-bold">
              Status :{" "}
              <span className="bg-[#d1b95a] px-2 rounded-full font-normal text-base">
                Active
              </span>
            </div>
          </div>
        </div>
        <div className="account-detail w-full px-4 py-2 bg-white rounded-b-lg">
          <div className="flex flex-row w-full justify-between m-0 p-0 pt-2">
            <Buttons title={"Basic Info"} to={"/account/me"} active={true} />
            <Buttons
              title={"My Orders"}
              to={"/account/orders"}
              active={false}
            />
            <Buttons title={"Settings"} to={"/account/orders"} active={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
