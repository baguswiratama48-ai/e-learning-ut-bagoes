import { Sesi2_Abk } from "./sesi2_abk";
import { Sesi2_Bk } from "./sesi2_bk";
import { Sesi2_Strategi } from "./sesi2_strategi";
import { Sesi3_5a } from "./sesi3_5a";
import { Sesi3_6a } from "./sesi3_6a";
import { Sesi3_8b } from "./sesi3_8b";
import { Sesi3_8c } from "./sesi3_8c";
import { Sesi4_5a } from "./sesi4_5a";
import { Sesi4_6a } from "./sesi4_6a";
import { Sesi4_8b } from "./sesi4_8b";
import { Sesi4_8c } from "./sesi4_8c";
import { Sesi5_5a } from "./sesi5_5a";
import { Sesi5_6a } from "./sesi5_6a";
import { Sesi5_8b } from "./sesi5_8b";
import { Sesi5_8c } from "./sesi5_8c";
import { Sesi6_5a } from "./sesi6_5a";
import { Sesi6_6a } from "./sesi6_6a";
import { Sesi6_8b } from "./sesi6_8b";
import { Sesi6_8c } from "./sesi6_8c";
import { Sesi7_5a } from "./sesi7_5a";
import { Sesi7_6a } from "./sesi7_6a";
import { Sesi7_8b } from "./sesi7_8b";
import { Sesi7_8c } from "./sesi7_8c";
import { Sesi8_5a } from "./sesi8_5a";
import { Sesi8_6a } from "./sesi8_6a";
import { Sesi8_8b } from "./sesi8_8b";
import { Sesi8_8c } from "./sesi8_8c";

const ALL_SESSIONS = [
  Sesi2_Abk,
  Sesi2_Bk,
  Sesi2_Strategi,
  Sesi3_5a,
  Sesi3_6a,
  Sesi3_8b,
  Sesi3_8c,
  Sesi4_5a,
  Sesi4_6a,
  Sesi4_8b,
  Sesi4_8c,
  Sesi5_5a,
  Sesi5_6a,
  Sesi5_8b,
  Sesi5_8c,
  Sesi6_5a,
  Sesi6_6a,
  Sesi6_8b,
  Sesi6_8c,
  Sesi7_5a,
  Sesi7_6a,
  Sesi7_8b,
  Sesi7_8c,
  Sesi8_5a,
  Sesi8_6a,
  Sesi8_8b,
  Sesi8_8c
];

export const getSessionConfig = (classId, meetingId) => {
  return ALL_SESSIONS.find(
    (s) => s.classIds.includes(String(classId)) && s.meetingId === String(meetingId)
  );
};

export const getAllAvailableSessions = () => ALL_SESSIONS;
