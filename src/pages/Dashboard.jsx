import {
  useEffect,
  useState,
} from "react";

export default function Dashboard() {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const getUser =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await fetch(
              "http://localhost:3000/api/auth/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (res.ok) {
            setUser(
              data.user
            );
          }
        } catch (error) {
          console.log(
            error
          );
        }
      };

    getUser();
  }, []);

  if (!user) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (
    <div className="text-white">
      <h1>
        Dashboard
      </h1>

      <h2 className="text-white">
        Welcome{" "}
        {user.email}
      </h2>

      <p>
        User ID:
        {user._id}
      </p>

      <p>
        Joined:
        {new Date(
          user.createdAt
        ).toLocaleString()}
      </p>
    </div>
  );
}