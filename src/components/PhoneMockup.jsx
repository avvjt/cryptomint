import phone from "../assets/phone.png";

export default function PhoneMockup() {
  return (
    <div
      className="
      relative
      w-[260px]
      md:w-[320px]
      lg:w-[380px]
      "
    >
      <img
        src={phone}
        alt="phone"
        className="w-full object-contain"
      />
    </div>
  );
}