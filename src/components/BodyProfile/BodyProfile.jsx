import React from "react";
import ProfileStyle from "../BodyProfile/BodyProfile.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import HttpsIcon from "@mui/icons-material/Https";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link } from "react-router-dom";
import SearchBtn from "../SearchBtn/SearchBtn";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

const BodyProfile = () => {
  return (
    <div className={ProfileStyle.page_profile}>
      {/* Nav */}
      <nav className={ProfileStyle.nav_profile}>
        <ul>
          <li className={ProfileStyle.nav_item}>
            <div className={ProfileStyle.nav_icon}>
              <AccountCircleIcon />
              <Link to="/profile" className={ProfileStyle.home_text}>
                Home
              </Link>
            </div>
          </li>

          <li className={ProfileStyle.nav_item}>
            <div className={ProfileStyle.nav_icon}>
              <BadgeIcon />
              <Link
                to="/PersonalInformation"
                className={ProfileStyle.home_text}
              >
                Personal information
              </Link>
            </div>
          </li>

          <li className={ProfileStyle.nav_item}>
            <div className={ProfileStyle.nav_icon}>
              <ToggleOnIcon />
              <Link to="/data" className={ProfileStyle.home_text}>
                Data and Privacy
              </Link>
            </div>
          </li>

          <li className={ProfileStyle.nav_item}>
            <div className={ProfileStyle.nav_icon}>
              <HttpsIcon />
              <Link to="/security" className={ProfileStyle.home_text}>
                Security
              </Link>
            </div>
          </li>

          <li className={ProfileStyle.nav_item}>
            <div className={ProfileStyle.nav_icon}>
              <PeopleAltIcon />
              <Link to="/AccessSettings" className={ProfileStyle.home_text}>
                Access Settings
              </Link>
            </div>
          </li>

          <li className={ProfileStyle.nav_item}>
            <div className={ProfileStyle.nav_icon}>
              <PaymentIcon />
              <Link to="/payments" className={ProfileStyle.home_text}>
                Payments and Subscriptions
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <HeaderProfile />

      <main className={ProfileStyle.main_content_profile}>
        <SearchBtn />

        <section className={ProfileStyle.profile_cards}>
          <div className={ProfileStyle.profile_card}>
            <div className={ProfileStyle.profile_card_content}>
              <div className={ProfileStyle.prof_icon}>
                {/* add icon styles right */}
                <SettingsAccessibilityIcon style={{ color: "#ff9800" }} />
              </div>
              <h2 className={ProfileStyle.card_text}>
                Privacy and personalization
              </h2>
              <div className={ProfileStyle.card_description}>
                Find out what data is stored in your account.
              </div>
            </div>
            <Link>Manage your data</Link>
          </div>

          <div className={ProfileStyle.profile_card}>
            <div className={ProfileStyle.profile_card_content}>
              <h2 className={ProfileStyle.card_text}>
                Recommendations for protection
              </h2>
              <div className={ProfileStyle.card_description}>
                Make sure your account is secure.
              </div>
            </div>
            <Link>Protect your account</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BodyProfile;
