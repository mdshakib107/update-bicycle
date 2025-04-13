import test2 from "../../assets/images/img/test2.jpg";

const Testimonial = () => {
  return (
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
  );
};

export default Testimonial;
