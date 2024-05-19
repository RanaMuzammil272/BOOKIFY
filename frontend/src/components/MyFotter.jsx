
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const MyFooter = () => {
  return (
    <Footer bgDark>
      <div className="w-full bg-gray-800 px-4 lg:px-24">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" className="text-gray-100" /> {/* Changed text color to light white */}
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="text-gray-100">About</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Careers</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Brand Center</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Blog</Footer.Link> {/* Changed text color to light white */}
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" className="text-gray-100" /> {/* Changed text color to light white */}
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="text-gray-100">Discord Server</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Twitter</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Facebook</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Contact Us</Footer.Link> {/* Changed text color to light white */}
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" className="text-gray-100" /> {/* Changed text color to light white */}
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="text-gray-100">Privacy Policy</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Licensing</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Terms &amp; Conditions</Footer.Link> {/* Changed text color to light white */}
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="download" className="text-gray-100" /> {/* Changed text color to light white */}
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="text-gray-100">iOS</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Android</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">Windows</Footer.Link> {/* Changed text color to light white */}
              <Footer.Link href="#" className="text-gray-100">MacOS</Footer.Link> {/* Changed text color to light white */}
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Flowbite™" year={2022} className="text-gray-100" /> {/* Changed text color to light white */}
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
  {/* Wrap each icon with an anchor tag */}
  <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
    <Footer.Icon icon={BsFacebook} />
  </a>
  <a href="https://www.instagram.com/muhammadtaha1780/" target="_blank" rel="noopener noreferrer">
    <Footer.Icon icon={BsInstagram} />
  </a>
  <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
    <Footer.Icon icon={BsTwitter} />
  </a>
  <a href="https://github.com/RanaMuzammil272/Bookify" target="_blank" rel="noopener noreferrer">
    <Footer.Icon icon={BsGithub} />
  </a>
  <a href="https://dribbble.com/yourpage" target="_blank" rel="noopener noreferrer">
    <Footer.Icon icon={BsDribbble} />
  </a>
</div>
        </div>
      </div>
    </Footer>
  )
}

export default MyFooter;
