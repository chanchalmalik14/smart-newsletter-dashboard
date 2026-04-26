export default function UserTable({ users }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Email</th>
            <th className="p-2">Signup Date</th>
            <th className="p-2">Last Sent</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{new Date(user.signup_date).toLocaleString()}</td>
              <td className="p-2">{user.last_sent ? new Date(user.last_sent).toLocaleString() : "Not Sent"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
