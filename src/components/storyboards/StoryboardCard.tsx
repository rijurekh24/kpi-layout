import { Icon } from "@iconify/react";

export interface StoryboardInfo {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  users: number;
}

export default function StoryboardCard({ title, description, lastUpdated, users }: StoryboardInfo) {
  return (
    <div className="flex flex-col items-center p-5 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer w-64 h-70">
      <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-md mb-4">
        <Icon icon="mdi:book-open-variant" fontSize={30} />
      </div>

      <h2 className="text-lg font-bold text-gray-800 text-center mb-2 line-clamp-1">{title}</h2>

      <p className="text-sm text-gray-600 text-center line-clamp-3 flex-grow">{description}</p>

      <div className="mt-auto flex items-center justify-between w-full pt-3 border-t border-gray-100">
        <span className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 rounded-full">{users} users</span>
        <span className="text-xs text-gray-400">{new Date(lastUpdated).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
