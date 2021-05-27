import React, { createContext, useState } from "react";

const SetsContext = createContext([]);

function SetProvider(props) {
  const [sets, setSets] = useState([]);
  return (
    <SetsContext.Provider value={[sets, setSets]}>
      {props.children}
    </SetsContext.Provider>
  );
}

export { SetProvider, SetsContext };
