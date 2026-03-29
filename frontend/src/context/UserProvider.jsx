import { useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}