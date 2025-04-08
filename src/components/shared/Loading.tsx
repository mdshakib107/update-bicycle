import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import lottie from "../../assets/lottie/lottie_bicycle.lottie?url";

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-auto w-auto bg-transparent'>
      <DotLottieReact
        src={lottie}
        loop
        autoplay
        className="p-10 m-10 "
      />
    </div>
  );
};

export default Loading;
