export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <ul className="space-y-4">
        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">Users</li>
        <li className="hover:text-blue-400 cursor-pointer">Analytics</li>
      </ul>
    </div>
  );
}