import { User } from "lucide-react";

export default function ProfileHeader({
  name,
  email,
  level,
  joined,
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      bg-zinc-900
      p-6
      "
    >
      <div className="flex items-center gap-5">

        <div
          className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-blue-500/20
          "
        >
          <User
            size={40}
            className="text-blue-500"
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            {name}
          </h2>

          <p className="text-zinc-400">
            {email}
          </p>

          <div className="mt-3 flex gap-2">

            <span
              className="
              rounded-full
              bg-blue-500/20
              px-3
              py-1
              text-sm
              text-blue-400
              "
            >
              Level {level}
            </span>

            <span
              className="
              rounded-full
              bg-zinc-800
              px-3
              py-1
              text-sm
              "
            >
              Joined {joined}
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}