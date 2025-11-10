import { Activity, Users } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const [onlineUsers, setOnlineUsers] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(Math.floor(Math.random() * (70 - 15 + 1)) + 15);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
        <Users className="w-3.5 h-3.5 text-success" />
        <span className="text-xs text-success font-medium">{onlineUsers} online</span>
      </div>
    </header>
  );
};
