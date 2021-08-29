import { FaInstagramSquare, FaFacebookF } from 'react-icons/fa';
const Header = () => {
  return (
    <div>
      <div className=" bg-brand-green h-16 ">
        <div className="flex px-3">
          <div className="mt-4 mx">
            <a href="https://katchkw.com">
              <img src="http://katchkw.com/wp-content/uploads/2020/11/logo-katch.svg" />
            </a>
          </div>
          <nav className="flex-1 justify-items-center text-center mt-6 px-16 ">
            <ul className="flex flex-1 h-full text-white max-w-2xl text-center	items-center ml-20">
              <li className="flex-1 ">
                <a title="Home" href="#home">
                  Home
                </a>
              </li>
              <li className="flex-1">
                <a title="About Us" href="#aboutus">
                  About Us
                </a>
              </li>
              <li className="flex-1">
                <a title="Partner with us" href="#partner">
                  Partner with us
                </a>
              </li>
              <li className="flex-1">
                <a title=" Whykatch" href="#Whykatch">
                  Why Katch!
                </a>
              </li>
              <li className="flex-1">
                <a title="Team" href="#team">
                  Team
                </a>
              </li>
              <li className="flex-1">
                <a title="faq" href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex mt-7">
            <a href="https://google.com">
              <FaFacebookF className="text-white	" />
            </a>
            <a href="https://google.com">
              <FaInstagramSquare className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
