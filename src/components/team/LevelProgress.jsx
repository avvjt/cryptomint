export default function LevelProgress() {

  return (

    <div className="rounded-3xl bg-zinc-900 p-6">

      <h2 className="text-xl font-bold">

        Current Level

      </h2>

      <h1 className="mt-3 text-4xl font-bold text-blue-500">

        LEVEL 2

      </h1>

      <div className="mt-6 h-3 rounded-full bg-zinc-800">

        <div
          className="
          h-full
          w-[80%]
          rounded-full
          bg-blue-500
          "
        />

      </div>

      <p className="mt-3 text-zinc-500">

        23 / 26 Members

      </p>

    </div>

  );

}