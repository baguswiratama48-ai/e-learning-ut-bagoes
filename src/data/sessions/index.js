import { Sesi2_BK } from "./sesi2_bk";

const ALL_SESSIONS = [
  Sesi2_BK,
  // Sesi lainnya akan ditambahkan di sini
];

export const getSessionConfig = (classId, meetingId) => {
  return ALL_SESSIONS.find(
    (s) => s.classIds.includes(String(classId)) && s.meetingId === String(meetingId)
  );
};

export const getAllAvailableSessions = () => ALL_SESSIONS;
