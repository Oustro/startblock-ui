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

interface Question {
  question: string;
  type: string;
}

interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  questions: Question[];
}


const StartBlock = ({ publicKey, children, className } : { publicKey: string, children: React.ReactNode, className?: string }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  async function fetchJobs() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const startBlockResponse = await fetch(`http://localhost:3000/api/jobs?pk=${publicKey}`, {
      method: "GET",
      headers: headers
    });

    const startBlockData = await startBlockResponse.json();

    return setJobs(startBlockData.jobs);
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
        <DialogTrigger className={className}>
          {children}
        </DialogTrigger>
        <DialogContent className="bg-white text-black rounded-none max-w-5xl h-[50rem] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Jobs</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-4">
            {jobs.length > 0 ? jobs.map((job) => (
              <div key={job.id} className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>{job.location}</p>
                <p>{job.salary}</p>
                <p className="whitespace-pre-wrap">{job.description}</p>
                <p className="whitespace-pre-wrap">{job.requirements}</p>
                <div className="flex flex-col gap-4">
                  {job.questions.map((question) => (
                    <div key={question.question} className="bg-gray-200 p-4 rounded-md">
                      <h3 className="text-lg font-bold">{question.question}</h3>
                      <p>{question.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )) : (
              <DialogDescription>No jobs found</DialogDescription>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartBlock;
