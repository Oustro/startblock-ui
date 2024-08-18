"use client";

import "./global.css";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const StartBlock = ({ publicKey } : {publicKey: string}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  async function fetchJobs() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const response = await fetch(`http://localhost:3001/api/jobs?pk=${publicKey}`, {
      method: "GET",
      headers: headers
    });
  }

  useEffect(() => {
    if (dialogOpen) {
      fetchJobs();
    }

  }, [dialogOpen]);

  return (
    <div className="p-4 text-white bg-black">
      <h1 className="text-2xl font-bold">Start Block</h1>
      <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen(!dialogOpen)}
      >
        <DialogTrigger>Open!</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartBlock;
