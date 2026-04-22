import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";
import UserTable from "./UserTable";
import AddUser from "./AddUser";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
  axios.get("http://127.0.0.1:5000/users")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err));
};
useEffect(() => {
  fetchUsers();
}, []);
const emailsSent = users.filter(u => u.last_sent !== null).length;

const newUsers = users.filter(u => {
  const signupDate = new Date(u.signup_date);
  const now = new Date();

  return (
    signupDate.getMonth() === now.getMonth() &&
    signupDate.getFullYear() === now.getFullYear()
  );
}).length;
  return (
    <div className="p-6 space-y-6">
        <AddUser refresh={fetchUsers} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Users" value={users.length} />
        <StatsCard title="Emails Sent" value={emailsSent} />
        <StatsCard title="New Users" value={newUsers} />
      </div>

      {/* Table */}
      <UserTable users={users} />

    </div>
  );
}