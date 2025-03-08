"use client";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const friends = [
    { id: "user1", name: "Alice" },
    { id: "user2", name: "Bob" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li 
            key={friend.id} 
            className="p-2 cursor-pointer hover:bg-gray-700 rounded"
            onClick={() => router.push(`/chat/${friend.id}`)}
          >
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
