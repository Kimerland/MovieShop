import React, { useState, useEffect } from "react";
import StyleSettings from "../SettingsContent/SettingsContent.module.scss";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const SettingsContent = () => {
  const [user, setUser] = useState<{
    username: string;
    email: string;
    avatarUrl: string;
  } | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { username, email, avatarUrl } = response.data.user;
        console.log("User data:", response.data.user);

        setUser({ username, email, avatarUrl });
        setEditedData({ username, email, password: "" });
      } catch (error: any) {
        console.error("Ошибка при загрузке пользователя", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => setEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user", editedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prev) =>
        prev
          ? { ...prev, username: editedData.username, email: editedData.email }
          : prev
      );
      setEditing(false);
    } catch (error) {
      console.error("Error add user", error);
    }
  };

  return (
    <div className={StyleSettings.settings_wrapper}>
      {user ? (
        <div className={StyleSettings.settings_container}>
          <p className={StyleSettings.settings_text}>Account Management</p>
          <div className={StyleSettings.settings_block}>
            <div className={StyleSettings.user_info}>
              <div className={StyleSettings.button_group}>
                {editing ? (
                  <>
                    <button
                      className={StyleSettings.button_settings}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className={StyleSettings.button_settings}
                      onClick={() => setEditing(false)}
                    >
                      <CloseIcon />
                    </button>
                  </>
                ) : (
                  <button
                    className={StyleSettings.button_settings}
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </button>
                )}
              </div>

              <div className={StyleSettings.input_group}>
                <label htmlFor="username" className={StyleSettings.input_label}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={StyleSettings.input_field}
                  value={editing ? editedData.username : user.username}
                  readOnly={!editing}
                  onChange={handleChange}
                />
              </div>

              <div className={StyleSettings.input_group}>
                <label htmlFor="email" className={StyleSettings.input_label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={StyleSettings.input_field}
                  value={editing ? editedData.email : user.email}
                  readOnly={!editing}
                  onChange={handleChange}
                />
              </div>

              <div className={StyleSettings.input_group}>
                <label htmlFor="password" className={StyleSettings.input_label}>
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={StyleSettings.input_field}
                  value={editing ? editedData.password : ""}
                  readOnly={!editing}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default SettingsContent;
