import PngIcons from "../assets/icons/PngIcons";
import SvgIcons from "../assets/icons/SvgIcons";

const Slides = ({ activatedSlide, setActivatedSlide }) => {
  return (
    <div id="Slides" className="flex w-full overflow-y-scroll" >
      <div className="slide-small-child active"> <img src={PngIcons.Football} style={{ width: '18px', height: '18px' }} className="mr-4" />  Football</div>
      <div className="slide-small-child"> <SvgIcons.BasketBall />  Basketball</div>
      <div className="slide-small-child"> <SvgIcons.BasketBall />  Basketball</div>
      <div className="slide-small-child"> <SvgIcons.BasketBall />  Basketball</div>

    </div>
  );
};
export default Slides;
