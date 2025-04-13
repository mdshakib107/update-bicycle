import { Modal } from "antd";
import img from "../../assets/images/img/doodle.svg";
import CustomButton from "../shared/CustomButton";

//  interface for contact modal
interface ContactUsProps {
  modal2Open: boolean;
  setModal2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactUs: React.FC<ContactUsProps> = ({ modal2Open, setModal2Open }) => {
  return (
    <div>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title="Hi! Nice to know your thoughts!"
        centered
        open={modal2Open}
        footer={null} // Remove default footer
        onCancel={() => setModal2Open(false)}
        width={1000} // Optional: Adjust modal width to fit form
      >
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-2 py-6 mx-auto rounded-lg md:grid-cols-2 md:px-4 lg:px-6 xl:px-8 dark:bg-gray-100 dark:text-gray-800">
          {/* Left Side */}
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                Let's talk!
              </h2>
              <div className="dark:text-gray-600">
                Any kind of related query? Let us know!
              </div>
            </div>
            <img src={img} alt="Doodle" className="p-6 h-52 md:h-64" />
          </div>

          {/* Right Side - Form */}
          <form noValidate className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder=""
                className="w-full p-3 rounded bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 rounded bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full p-3 rounded bg-gray-100"
              ></textarea>
            </div>

            {/* handle function & api needed for work */}
            <CustomButton
              textName="Send Message"
              className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-violet-600 dark:text-gray-50"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ContactUs;
