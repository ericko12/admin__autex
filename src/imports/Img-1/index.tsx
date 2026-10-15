import imgCta from "./12482594a647f631b019869b1c5a12fbb261a67d.png";
import imgCta1 from "./4d3d2ca9fe133a6fc38de341744ba919ed5eaff4.png";

function Frame() {
  return <div className="absolute bg-black h-[1080px] left-0 mix-blend-color top-0 w-[968px]" />;
}

function Cta() {
  return (
    <div className="absolute h-[1080px] left-0 mix-blend-overlay overflow-clip top-0 w-[968px]" data-name="CTA">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#c1c1c1] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-80 size-full" src={imgCta} />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgCta1} />
      </div>
      <Frame />
    </div>
  );
}

function BlueBg1() {
  return <div className="absolute bg-[#1226aa] h-[1080px] left-0 top-0 w-[968px]" data-name="blue bg" />;
}

function BlueBg() {
  return (
    <div className="absolute bg-[#c1c1c1] h-[918px] left-0 mix-blend-screen overflow-clip top-0 w-[968px]" data-name="blue bg">
      <BlueBg1 />
    </div>
  );
}

function ImgBg() {
  return (
    <div className="absolute h-[1080px] left-0 top-0 w-[968px]" data-name="Img bg">
      <Cta />
      <BlueBg />
    </div>
  );
}

export default function Img() {
  return (
    <div className="bg-[rgba(18,38,170,0.4)] relative size-full" data-name="Img">
      <ImgBg />
    </div>
  );
}