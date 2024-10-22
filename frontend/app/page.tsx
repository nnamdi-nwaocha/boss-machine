"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Meeting } from "@/types/types";

const Home = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  // Fetch pending meetings (this will hit your backend API)
  useEffect(() => {
    fetch("http://localhost:4000/api/meetings") // Adjust the API endpoint to your backend route
      .then((response) => response.json())
      .then((data) => setMeetings(data));
  }, []);
  console.log(meetings);

  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link href="/minions">
          <button>View Minions</button>
        </Link>
        <Link href="/ideas">
          <button>View Ideas</button>
        </Link>
      </div>
      <div>
        <h2>Pending Meetings</h2>
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              {meeting.time} - {meeting.date} - {meeting.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
