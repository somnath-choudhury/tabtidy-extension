import React, { useEffect, useState } from "react";

interface TabData {
  title: string;
  url: string;
  favIconUrl: string;
  read?: boolean;
}

const TabDashboard: React.FC = () => {
  const [tabs, setTabs] = useState<TabData[]>([]);

  useEffect(() => {
    chrome.storage.local.get(["savedTabs"], (result) => {
      setTabs(result.savedTabs || []);
    });
  }, []);

  const markAsRead = (index: number) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].read = true;
    setTabs(updatedTabs);
    chrome.storage.local.set({ savedTabs: updatedTabs });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          📚 Your Saved Tabs
        </h1>

        {tabs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No saved tabs found.
          </p>
        ) : (
          <ul className="space-y-5">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3 w-3/4 overflow-hidden">
                  {tab.favIconUrl && (
                    <img
                      src={tab.favIconUrl}
                      alt="icon"
                      className="w-5 h-5 flex-shrink-0"
                    />
                  )}
                  <a
                    href={tab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-blue-600 hover:underline text-base"
                    title={tab.title}
                  >
                    {tab.title}
                  </a>
                </div>

                <div>
                  {!tab.read ? (
                    <button
                      onClick={() => markAsRead(index)}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow"
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">✓ Read</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TabDashboard;
