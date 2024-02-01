import { Twitter, Linkedin, Heart } from "lucide-react";
const Footer = () => {
  return (
    <div className="mt-10 p-5">
      <div className="last-updated text-center">
        Last updated: <b>1st February, 2024.</b>
      </div>
      <div className="footer-content mt-10 flex items-center justify-between w-[900px] m-auto">
        <div className="socials flex items-center  gap-5">
          <a href="https://twitter.com/Everichbernz" target="_blank">
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/bernard-arhia-ba4662104/"
            target="_blank"
          >
            <Linkedin />
          </a>
        </div>
        <div className="content flex gap-5">
            Made With <Heart fill="red" strokeWidth={0} /> by Bernard Arhia
        </div>
      </div>
    </div>
  );
};

export default Footer;
