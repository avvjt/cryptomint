import {
  Monitor,
  Smartphone,
  MapPin,
  Clock3,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const devices = [

  {
    id: 1,
    device: "Windows PC",

    browser: "Chrome",

    location: "Kolkata, India",

    ip: "192.168.xxx.xxx",

    lastActive: "Now",

    current: true,

    icon: Monitor,
  },

  {
    id: 2,
    device: "Samsung S24",

    browser: "Chrome Mobile",

    location: "Kolkata, India",

    ip: "192.168.xxx.xxx",

    lastActive: "2 hours ago",

    current: false,

    icon: Smartphone,
  },

];

export default function LoginDevices() {

  return (

    <section
      className="
      rounded-[32px]

      border
      border-white/5

      bg-gradient-to-br
      from-[#111318]
      to-[#0D1119]

      p-6

      lg:p-8
      "
    >

      {/* Header */}

      <div
        className="
        flex

        items-center

        justify-between
        "
      >

        <div>

          <p
            className="
            text-xs

            uppercase

            tracking-[0.25em]

            text-zinc-500
            "
          >

            Security

          </p>

          <h2
            className="
            mt-2

            text-2xl

            font-bold
            "
          >

            Login Devices

          </h2>

        </div>

        <button
          className="
          rounded-full

          bg-red-500/10

          px-5

          py-3

          text-sm

          font-semibold

          text-red-400

          transition

          hover:bg-red-500/20
          "
        >

          Log Out All

        </button>

      </div>

      {/* Devices */}

      <div className="mt-8 space-y-5">

        {

          devices.map((device)=>{

            const Icon = device.icon;

            return(

              <div

                key={device.id}

                className="
                rounded-3xl

                border
                border-white/5

                bg-[#171B22]

                p-5

                transition

                hover:border-[#1D66FF]/30
                "

              >

                <div className="flex justify-between">

                  <div className="flex gap-4">

                    <div
                      className="
                      flex

                      h-14
                      w-14

                      items-center
                      justify-center

                      rounded-2xl

                      bg-[#1D66FF]/10
                      "
                    >

                      <Icon
                        size={28}
                        className="text-[#1D66FF]"
                      />

                    </div>

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="font-semibold">

                          {device.device}

                        </h3>

                        {

                          device.current && (

                            <span
                              className="
                              rounded-full

                              bg-green-500/10

                              px-3

                              py-1

                              text-xs

                              text-green-400
                              "
                            >

                              Current

                            </span>

                          )

                        }

                      </div>

                      <p
                        className="
                        mt-1

                        text-sm

                        text-zinc-500
                        "
                      >

                        {device.browser}

                      </p>

                    </div>

                  </div>

                  {

                    !device.current && (

                      <button
                        className="
                        rounded-xl

                        bg-red-500/10

                        p-3

                        text-red-400

                        hover:bg-red-500/20
                        "
                      >

                        <LogOut size={18}/>

                      </button>

                    )

                  }

                </div>

                <div
                  className="
                  mt-6

                  grid

                  gap-4

                  sm:grid-cols-3
                  "
                >

                  <Info
                    icon={MapPin}
                    value={device.location}
                  />

                  <Info
                    icon={ShieldCheck}
                    value={device.ip}
                  />

                  <Info
                    icon={Clock3}
                    value={device.lastActive}
                  />

                </div>

              </div>

            );

          })

        }

      </div>

    </section>

  );

}

function Info({

  icon: Icon,

  value,

}){

  return(

    <div className="flex items-center gap-3">

      <Icon
        size={16}
        className="text-zinc-500"
      />

      <span
        className="
        text-sm

        text-zinc-400
        "
      >

        {value}

      </span>

    </div>

  );

}