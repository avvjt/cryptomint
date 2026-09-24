import { useEffect, useRef, useState } from "react";
import { useAccountStatusContext } from "../context/AccountStatusContext";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE = {
  fullName: "CryptoMintX User",
  username: "user",
  email: "",
  avatar: "",
};

export default function Profile() {
  const fileInputRef = useRef(null);

  const { isActive } = useAccountStatusContext();

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState(DEFAULT_PROFILE);

  const [message, setMessage] = useState("");

  const [avatarError, setAvatarError] = useState("");

  const [showChangePassword, setShowChangePassword] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        const user = data.user;

        const nextProfile = {
          fullName: user.fullName || "CryptoMintX User",
          username: user.username || "user",
          email: user.email || "",
          avatar: user.avatarUrl || "",
        };

        setProfile(nextProfile);
        setForm(nextProfile);
      } catch (error) {
        console.error("Unable to load profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEdit = () => {
    setForm(profile);
    setMessage("");
    setEditing(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setMessage("");
    setEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const fullName = form.fullName.trim();
    const username = form.username.trim();

    if (!fullName) {
      setMessage("Full name is required.");
      return;
    }

    if (!username) {
      setMessage("Username is required.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setMessage("");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            username,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message || "Unable to update profile."
        );
        return;
      }

      const updatedProfile = {
        ...profile,
        fullName: data.user.fullName,
        username: data.user.username,
        email: data.user.email,
        avatar: user.avatarUrl
          ? user.avatarUrl.startsWith("http")
            ? user.avatarUrl
            : `${import.meta.env.VITE_API_BASE_URL || "https://backendxmint.onrender.com"}${user.avatarUrl}`
          : "",
      };

      setProfile(updatedProfile);
      setForm(updatedProfile);

      setMessage("Profile updated successfully.");
      setEditing(false);

    } catch (error) {
      console.error("Update profile error:", error);

      setMessage(
        error.message || "Unable to connect to the server."
      );
    }
  };

  const handleAvatarClick = () => {
    setAvatarError("");

    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError(
        "Please choose a JPG, PNG, or WebP image."
      );

      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setAvatarError(
        "Profile picture must be smaller than 5 MB."
      );

      event.target.value = "";
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const formData = new FormData();

      formData.append("avatar", file);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAvatarError(
          data.message ||
          "Unable to upload profile picture."
        );
        return;
      }

      const avatar =
        `${import.meta.env.VITE_API_BASE_URL}${data.avatarUrl}`;

      const updatedProfile = {
        ...profile,
        avatar,
      };

      setProfile(updatedProfile);
      setForm(updatedProfile);

    } catch (error) {
      console.error(
        "Avatar upload error:",
        error
      );

      setAvatarError(
        "Unable to connect to the server."
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setAvatarError("");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/avatar`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setAvatarError(
          data.message ||
          "Unable to remove profile picture."
        );
        return;
      }

      const updatedProfile = {
        ...profile,
        avatar: "",
      };

      setProfile(updatedProfile);
      setForm(updatedProfile);

    } catch (error) {
      console.error(
        "Remove avatar error:",
        error
      );

      setAvatarError(
        "Unable to connect to the server."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cryptomintx_profile");

    navigate("/login", { replace: true });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage(
        "Please fill in all password fields."
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "New passwords do not match."
      );
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPasswordMessage(
          data.message || "Unable to change password."
        );
        return;
      }

      setPasswordMessage(
        "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordMessage("");
      }, 1500);
    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      setPasswordMessage(
        "Unable to connect to the server."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  if (profileLoading || !profile) {
    return (
      <main className="min-h-screen bg-[#090B0E] px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px]">

          {/* Loading header */}
          <div className="mb-5">
            <div className="h-6 w-24 animate-pulse rounded bg-[#1A1E24]" />
            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-[#1A1E24]" />
          </div>

          {/* Loading profile card */}
          <section className="rounded-2xl border border-[#1A1E24] bg-[#0D1014] p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Avatar skeleton */}
              <div className="h-24 w-24 shrink-0 animate-pulse rounded-full bg-[#1A1E24]" />

              {/* Name skeleton */}
              <div className="min-w-0 flex-1">
                <div className="h-5 w-40 animate-pulse rounded bg-[#1A1E24]" />

                <div className="mt-2 h-4 w-28 animate-pulse rounded bg-[#1A1E24]" />

                <div className="mt-4 h-6 w-28 animate-pulse rounded-full bg-[#1A1E24]" />
              </div>

              {/* Edit button skeleton */}
              <div className="h-10 w-28 animate-pulse rounded-xl bg-[#1A1E24]" />

            </div>

            <div className="mt-5 border-t border-[#1A1E24] pt-5">
              <div className="h-9 w-28 animate-pulse rounded-lg bg-[#1A1E24]" />

              <div className="mt-2 h-3 w-52 animate-pulse rounded bg-[#1A1E24]" />
            </div>
          </section>

          {/* Other loading cards */}
          <div className="mt-5 h-48 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />

          <div className="mt-5 h-40 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />

          <div className="mt-5 h-48 animate-pulse rounded-2xl border border-[#1A1E24] bg-[#0D1014]" />

        </div>
      </main>
    );
  }

  const initials = getInitials(
    profile.fullName,
    profile.username
  );

  return (
    <main
      className="
        min-h-screen
        bg-[#090B0E]
        px-4
        pb-28
        pt-5
        text-white
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-[900px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-5">

          <h1 className="text-xl font-semibold">
            Profile
          </h1>

          <p className="mt-1 text-sm text-[#737B89]">
            Manage your account information
          </p>

        </header>


        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <section
          className="
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
            p-5
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
            "
          >

            {/* Avatar */}

            <div className="relative shrink-0">

              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="
                    h-24
                    w-24
                    rounded-full
                    object-cover
                    ring-1
                    ring-[#1A1E24]
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1A1E24]
                    text-xl
                    font-semibold
                    text-[#AAB1BD]
                  "
                >
                  {initials}
                </div>
              )}

              <button
                type="button"
                onClick={handleAvatarClick}
                className="
                  absolute
                  bottom-0
                  right-0
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#090B0E]
                  bg-[#4D8DFF]
                  text-xs
                  font-semibold
                  text-white
                "
                aria-label="Change profile picture"
              >
                +
              </button>

            </div>


            {/* User summary */}

            <div className="min-w-0 flex-1">

              <p className="truncate text-lg font-semibold">
                {profile.fullName}
              </p>

              <p className="mt-1 text-sm text-[#737B89]">
                @{profile.username}
              </p>

              <div className="mt-3">

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-[11px]
                    font-medium

                    ${isActive
                      ? "border-[#08B77A]/30 bg-[#08B77A]/10 text-[#08B77A]"
                      : "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]"
                    }
                  `}
                >
                  {isActive
                    ? "Account Active"
                    : "Verification Pending"}
                </span>

              </div>

            </div>


            {/* Edit */}

            <button
              type="button"
              onClick={handleEdit}
              className="
                rounded-xl
                border
                border-[#1A1E24]
                px-4
                py-2.5
                text-sm
                font-medium
                text-[#AAB1BD]
                transition
                hover:bg-[#14181E]
                hover:text-white
              "
            >
              Edit profile
            </button>

          </div>


          {/* Avatar controls */}

          <div
            className="
              mt-5
              border-t
              border-[#1A1E24]
              pt-5
            "
          >

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={handleAvatarClick}
                className="
                  rounded-lg
                  border
                  border-[#1A1E24]
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-[#AAB1BD]
                  hover:bg-[#14181E]
                  hover:text-white
                "
              >
                Change photo
              </button>

              {profile.avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="
                    rounded-lg
                    border
                    border-[#F6465D]/20
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-[#F6465D]
                    hover:bg-[#F6465D]/5
                  "
                >
                  Remove photo
                </button>
              )}

            </div>

            <p className="mt-2 text-xs text-[#737B89]">
              JPG, PNG or WebP. Maximum 5 MB.
            </p>

            {avatarError && (
              <p className="mt-2 text-xs text-[#F6465D]">
                {avatarError}
              </p>
            )}

          </div>

        </section>


        {/* =====================================================
            PROFILE INFORMATION
        ===================================================== */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
          "
        >

          <div
            className="
              border-b
              border-[#1A1E24]
              p-5
            "
          >

            <p className="text-sm font-semibold">
              Personal information
            </p>

            <p className="mt-1 text-xs text-[#737B89]">
              Your basic account information
            </p>

          </div>


          {!editing ? (
            <ProfileDetails
              profile={profile}
            />
          ) : (
            <EditProfileForm
              form={form}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
              message={message}
            />
          )}

        </section>


        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
          "
        >

          <div
            className="
              border-b
              border-[#1A1E24]
              p-5
            "
          >

            <p className="text-sm font-semibold">
              Account
            </p>

          </div>


          <div className="divide-y divide-[#1A1E24]">

            <InfoRow
              label="Account status"
              value={
                isActive
                  ? "Active"
                  : "Verification pending"
              }
            />

            <InfoRow
              label="Username"
              value={`@${profile.username}`}
            />

            <InfoRow
              label="Account type"
              value="Standard"
            />

          </div>

        </section>


        {/* =====================================================
            SECURITY
        ===================================================== */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#1A1E24]
            bg-[#0D1014]
          "
        >

          <div
            className="
              border-b
              border-[#1A1E24]
              p-5
            "
          >

            <p className="text-sm font-semibold">
              Security
            </p>

            <p className="mt-1 text-xs text-[#737B89]">
              Manage your account security
            </p>

          </div>


          <div className="divide-y divide-[#1A1E24]">

            <SecurityRow
              title="Change password"
              description="Update your account password"
              onClick={() => {
                setPasswordMessage("");
                setShowChangePassword(
                  (current) => !current
                );
              }}
            />

            {showChangePassword && (
              <ChangePasswordForm
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                setCurrentPassword={setCurrentPassword}
                setNewPassword={setNewPassword}
                setConfirmPassword={setConfirmPassword}
                onSubmit={handleChangePassword}
                onCancel={() => {
                  setShowChangePassword(false);
                  setPasswordMessage("");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                message={passwordMessage}
                loading={passwordLoading}
              />
            )}

            <SecurityRow
              title="Two-factor authentication"
              description="Add an extra layer of account security"
              onClick={() => {
                alert(
                  "Two-factor authentication will be connected to the backend."
                );
              }}
            />

          </div>

        </section>

        {/* =============================================================
   LOGOUT
============================================================= */}

        <section className="mt-6">
          <button
            type="button"
            onClick={handleLogout}
            className="
      w-full
      rounded-2xl
      border
      border-red-500/20
      bg-red-500/5
      px-5
      py-4
      text-left
      transition
      hover:border-red-500/30
      hover:bg-red-500/10
    "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-red-400">
                  Log out
                </p>

                <p className="mt-1 text-xs text-[#737B88]">
                  Sign out of your CryptoMintX account
                </p>
              </div>

              <span className="text-lg text-red-400">
                →
              </span>
            </div>
          </button>
        </section>

      </div>

    </main>
  );
}


/* =============================================================
   PROFILE DETAILS
============================================================= */

function ProfileDetails({
  profile,
}) {
  return (
    <div className="divide-y divide-[#1A1E24]">

      <InfoRow
        label="Full name"
        value={profile.fullName}
      />

      <InfoRow
        label="Username"
        value={`@${profile.username}`}
      />

      <InfoRow
        label="Email"
        value={profile.email}
      />


    </div>
  );
}


/* =============================================================
   EDIT FORM
============================================================= */

function EditProfileForm({
  form,
  onChange,
  onSave,
  onCancel,
  message,
}) {
  return (
    <div className="p-5">

      <div className="space-y-5">

        <FormInput
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={onChange}
        />

        <FormInput
          label="Username"
          name="username"
          value={form.username}
          onChange={onChange}
        />

        <FormInput
          label="Email"
          name="email"
          value={form.email}
          onChange={onChange}
          type="email"
          disabled
        />



      </div>


      {message && (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-[#F59E0B]/20
            bg-[#F59E0B]/5
            p-3
          "
        >
          <p className="text-xs text-[#F59E0B]">
            {message}
          </p>
        </div>
      )}


      <div className="mt-5 flex gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="
            flex-1
            rounded-xl
            border
            border-[#1A1E24]
            py-3
            text-sm
            font-medium
            text-[#AAB1BD]
            hover:bg-[#14181E]
            hover:text-white
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSave}
          className="
            flex-1
            rounded-xl
            bg-[#4D8DFF]
            py-3
            text-sm
            font-semibold
            text-white
            hover:bg-[#3D7EF0]
          "
        >
          Save changes
        </button>

      </div>

    </div>
  );
}


/* =============================================================
   FORM INPUT
============================================================= */

function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
}) {
  return (
    <div>

      <label
        className="
          block
          text-xs
          text-[#737B89]
        "
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          mt-2
          w-full
          rounded-xl
          border
          border-[#1A1E24]
          bg-[#090B0E]
          px-4
          py-3
          text-sm
          text-white
          outline-none

          ${disabled
            ? "cursor-not-allowed opacity-50"
            : "focus:border-[#4D8DFF]"
          }
        `}
      />

      {disabled && (
        <p className="mt-1 text-[11px] text-[#555D68]">
          This information requires account verification
          to change.
        </p>
      )}

    </div>
  );
}


/* =============================================================
   INFO ROW
============================================================= */

function InfoRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        p-5
      "
    >

      <span className="text-sm text-[#737B89]">
        {label}
      </span>

      <span className="max-w-[60%] break-words text-right text-sm text-white">
        {value}
      </span>

    </div>
  );
}


/* =============================================================
   SECURITY ROW
============================================================= */

function SecurityRow({
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-between
        gap-4
        p-5
        text-left
        transition
        hover:bg-[#11151A]
      "
    >

      <div>

        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#737B89]">
          {description}
        </p>

      </div>

      <span className="text-[#737B89]">
        →
      </span>

    </button>
  );
}



/* =============================================================
   INITIALS
============================================================= */

function getInitials(
  fullName,
  username
) {
  const value =
    String(fullName || username || "U")
      .trim();

  const parts =
    value.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return (
      parts[0][0] +
      parts[1][0]
    ).toUpperCase();
  }

  return value
    .slice(0, 2)
    .toUpperCase();
}

function ChangePasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  onSubmit,
  onCancel,
  message,
  loading,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        border-t
        border-[#1A1E24]
        bg-[#0A0D11]
        p-5
      "
    >
      <div className="space-y-4">

        {/* Current password */}
        <div>
          <label className="block text-xs text-[#737B89]">
            Current password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            autoComplete="current-password"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-[#1A1E24]
              bg-[#090B0E]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              focus:border-[#4D8DFF]
            "
            placeholder="Enter current password"
          />
        </div>

        {/* New password */}
        <div>
          <label className="block text-xs text-[#737B89]">
            New password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            autoComplete="new-password"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-[#1A1E24]
              bg-[#090B0E]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              focus:border-[#4D8DFF]
            "
            placeholder="Enter new password"
          />

          <p className="mt-1 text-[11px] text-[#555D68]">
            Minimum 8 characters
          </p>
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-xs text-[#737B89]">
            Confirm new password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            autoComplete="new-password"
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-[#1A1E24]
              bg-[#090B0E]
              px-4
              py-3
              text-sm
              text-white
              outline-none
              focus:border-[#4D8DFF]
            "
            placeholder="Confirm new password"
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className="
              rounded-xl
              border
              border-[#4D8DFF]/20
              bg-[#4D8DFF]/5
              p-3
            "
          >
            <p className="text-xs text-[#AAB1BD]">
              {message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-1">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              flex-1
              rounded-xl
              border
              border-[#1A1E24]
              py-3
              text-sm
              font-medium
              text-[#AAB1BD]
              hover:bg-[#14181E]
              hover:text-white
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              flex-1
              rounded-xl
              bg-[#4D8DFF]
              py-3
              text-sm
              font-semibold
              text-white
              hover:bg-[#3D7EF0]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Updating..."
              : "Change password"}
          </button>

        </div>
      </div>
    </form>
  );
}