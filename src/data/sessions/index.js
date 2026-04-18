import { Sesi2_BK } from "./sesi2_bk";
import { Sesi2_ABK } from "./sesi2_abk";
import { Sesi2_Strategi } from "./sesi2_strategi";

const ALL_SESSIONS = [
  Sesi2_BK,
  Sesi2_ABK,
  Sesi2_Strategi,
  // Sesi lainnya akan ditambahkan di sini
];

export const getSessionConfig = (classId, meetingId) => {
  return ALL_SESSIONS.find(
    (s) => s.classIds.includes(String(classId)) && s.meetingId === String(meetingId)
  );
};

export const getAllAvailableSessions = () => ALL_SESSIONS;
