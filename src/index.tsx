"use client";

import "./global.css";

import { useState, useEffect } from "react";

const StartBlock = ({ publicKey } : {publicKey: string}) => {
  const [block, setBlock] = useState<string | null>("hi Pussy");

  return (
    <div className="p-4 text-white bg-black">
      {block}
      {publicKey}
    </div>
  );
};

export default StartBlock;
