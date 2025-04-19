import cycle1 from "../../assets/images/img/us1.jpg";
import cycle2 from "../../assets/images/img/us2.jpg";
import cycle3 from "../../assets/images/img/us3.jpg";

const About = () => {
  return (
    <div className="space-y-16 text-justify">
      <div className="w-full min-h-[55vh] rounded-4xl! shadow-purple-600 shadow-2xl">
        <section className="relative rounded-4xl! isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20"></div>
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <img
              src="https://avatars.githubusercontent.com/u/54356991?v=4"
              alt="image"
              className="mx-auto h-48 rounded-full"
            />
            <figure className="mt-10">
              <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
                <p>
                  “Being a modern bike shop with traditional values of great,
                  friendly service and a commitment to the local community, we
                  make a point of carrying a huge range of affordable kids and
                  family bikes, in a wide selection of colours.”
                </p>
              </blockquote>
              <figcaption className="mt-10">
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-fuchsia-900">D' Costa</div>
                  <svg
                    viewBox="0 0 2 2"
                    width="3"
                    height="3"
                    aria-hidden="true"
                    className="fill-gray-900"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  <div className="text-fuchsia-600">CEO of Bicycle </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
              History!
            </h1>
            <p className="text-[16px] mt-2">
              BicycleB is the very first premium bicycle brand manufactured in
              Bangladesh. The brand is owned by Meghna, the number 1 premium
              bike manufacturer in South Asia. BicycleB started its journey back
              in 2014 to provide affordable premium bikes for cycling
              enthusiasts, while maintaining all European ISO standards that
              Meghna learnt from the experiences in exporting bikes to Europe.
              The brand started small, with selling only few hundred units per
              month back in 2014
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle1}
              alt="image"
              className="w-full h-full rounded-4xl"
            />
          </div>
        </header>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle2}
              alt="image"
              className="w-full h-full rounded-4xl"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
              Market Position!
            </h1>
            <p className="text-[16px] mt-2">
              Currently, BicycleB is the most well known bicycle brand in
              Bangladesh, and one of the few bicycle brands catering to the
              premium bicycle segment in Bangladesh with over 80% market share.
              BicycleB has reached the global market starting with India in
              2020, currently expanding distribution networks in India and
              surrounding countries in the region.
            </p>
          </div>
        </header>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
              BicycleB Technologies!
            </h1>
            <p className="text-[16px] mt-2">
              A premium bicycle component brand manufactured by Meghna. It is
              the perfect mixture of innovation, technology and design to
              provide superior quality, and durability.
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle3}
              alt="image"
              className="w-full h-full rounded-4xl"
            />
          </div>
        </header>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle2}
              alt="image"
              className="w-full h-full rounded-4xl"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
              Market Position!
            </h1>
            <p className="text-[16px] mt-2">
              Currently, BicycleB is the most well known bicycle brand in
              Bangladesh, and one of the few bicycle brands catering to the
              premium bicycle segment in Bangladesh with over 80% market share.
              BicycleB has reached the global market starting with India in
              2020, currently expanding distribution networks in India and
              surrounding countries in the region.
            </p>
          </div>
        </header>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
              OUR TEAM!
            </h1>
            <p className="text-[16px] mt-2">
              Our staff are active, passionate bike riders and racers, who offer
              professional sales help and bike fitting advice. Based around the
              Mornington Peninsula, you'll find us riding the local trails and
              roads. Keep an eye on our to join us on our regular Shop Rides!
              Our bike range caters for everyone – pro riders, downhill and
              enduro adrenalin junkies, rail trail and bike path adventure
              seekers, and families looking to enjoy the weekend bike ride
              around the neighborhood bike paths
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle3}
              alt="image"
              className="w-full h-full rounded-4xl"
            />
          </div>
        </header>
      </div>
      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl">
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle2}
              alt="image"
              className="w-full h-full rounded-4xl"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
              OUR SERVICES!
            </h1>
            <p className="text-[16px] mt-2">
              From sales, to bike service, repairs, and expert advice, the team
              at The Bicycle Company are here across three locations for all
              your cycling needs. If you've got any questions, feedback, or want
              to get in touch with us, use the contact or chat buttons below to
              reach out!
            </p>
          </div>
        </header>
      </div>
    </div>
  );
};

export default About;
