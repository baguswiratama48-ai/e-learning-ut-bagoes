import { Sesi2_ABK } from "./sesi2_abk";
import { Sesi2_BK } from "./sesi2_bk";
import { Sesi2_Strategi } from "./sesi2_strategi";

// Sesi 3
import { Sesi3_5A } from "./sesi3_5a";
import { Sesi3_6A } from "./sesi3_6a";
import { Sesi3_8B } from "./sesi3_8b";
import { Sesi3_8C } from "./sesi3_8c";

// Sesi 4
import { Sesi4_5A } from "./sesi4_5a";
import { Sesi4_6A } from "./sesi4_6a";
import { Sesi4_8B } from "./sesi4_8b";
import { Sesi4_8C } from "./sesi4_8c";

// Sesi 5
import { Sesi5_5A } from "./sesi5_5a";
import { Sesi5_6A } from "./sesi5_6a";
import { Sesi5_8B } from "./sesi5_8b";
import { Sesi5_8C } from "./sesi5_8c";

// Sesi 6
import { Sesi6_5A } from "./sesi6_5a";
import { Sesi6_6A } from "./sesi6_6a";
import { Sesi6_8B } from "./sesi6_8b";
import { Sesi6_8C } from "./sesi6_8c";

// Sesi 7
import { Sesi7_5A } from "./sesi7_5a";
import { Sesi7_6A } from "./sesi7_6a";
import { Sesi7_8B } from "./sesi7_8b";
import { Sesi7_8C } from "./sesi7_8c";

// Sesi 8
import { Sesi8_5A } from "./sesi8_5a";
import { Sesi8_6A } from "./sesi8_6a";
import { Sesi8_8B } from "./sesi8_8b";
import { Sesi8_8C } from "./sesi8_8c";

const ALL_SESSIONS = [
  Sesi2_ABK,
  Sesi2_BK,
  Sesi2_Strategi,
  Sesi3_5A,
  Sesi3_6A,
  Sesi3_8B,
  Sesi3_8C,
  Sesi4_5A,
  Sesi4_6A,
  Sesi4_8B,
  Sesi4_8C,
  Sesi5_5A,
  Sesi5_6A,
  Sesi5_8B,
  Sesi5_8C,
  Sesi6_5A,
  Sesi6_6A,
  Sesi6_8B,
  Sesi6_8C,
  Sesi7_5A,
  Sesi7_6A,
  Sesi7_8B,
  Sesi7_8C,
  Sesi8_5A,
  Sesi8_6A,
  Sesi8_8B,
  Sesi8_8C
];

export const getSessionConfig = (classId, meetingId) => {
  return ALL_SESSIONS.find(
    (s) => s.classIds.includes(String(classId)) && s.meetingId === String(meetingId)
  );
};

export const getAllAvailableSessions = () => ALL_SESSIONS;
