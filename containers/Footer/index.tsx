import { FaMap, FaPhone, FaFacebook, FaInstagramSquare, FaLinkedinIn } from 'react-icons/fa';
const Footer = () => {
  return (
    <div>
      <div className="flex">
        <div className="logo flex-1 px-5">
          <img src="https://katchkw.com/wp-content/uploads/2020/11/footer-logo.svg" />
          <p className="mt-6 leading-8">
            We bring the restaurant
            <br />
            community closer to you!
            <br /> Order now on katch!
          </p>
        </div>

        <div className="flex-1">
          <strong className="text-2xl"> Contact:</strong>
          <div className="mt-4">
            <span className="flex">
              <FaPhone className="mr-2 mt-1 text-brand-green text-xl	" />
              +965 2297 4411
            </span>
            <br />
            <span className="max-w-xs flex">
              <FaMap className=" mr-2 text-brand-green text-2xl		" />
              Al Hamad Tower A, 5th Floor, Abu Bakr St, Kuwait City
            </span>
          </div>
        </div>
        <div className=" flex-1">
          <strong className="text-2xl	">Social links:</strong>
          <div className="flex">
            <a href="https://google.com">
              <FaFacebook className="text-4xl	" />
            </a>
            <a href="google.com">
              <FaInstagramSquare className="text-4xl	" />
            </a>
            <a href="linkedin.com">
              <FaLinkedinIn className="text-4xl	" />
            </a>
          </div>
          <a href="https://apps.apple.com/us/app/katch-kw/id1531865963">
            <img className="mt-3" src="https://katchkw.com/wp-content/uploads/2020/11/play-store-logo.svg" />
          </a>
          <a className="" href="https://play.google.com/store/apps/details?id=com.aktech.katch">
            <img src="https://katchkw.com/wp-content/uploads/2020/11/play-store-logo-google.svg" />
          </a>
        </div>
      </div>
      <hr></hr>
      <div className="my-5 flex items-center px-5">
        <span>© 2020 Katch!</span>

        <ul className="flex flex-1 justify-end">
          <li className="ml-5">
            <a href="google.com">Help</a>
          </li>
          <li className="ml-5">
            <a href="google.com">Terms and Conditions</a>
          </li>
          <li className="ml-5">
            <a href="google.com">Privacy</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
