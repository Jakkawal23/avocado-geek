import type { Variety } from "./types";

// Client-safe: pure functions only, no filesystem access, so this can be
// imported directly by the "use client" <MatchQuizClient>.

export type Region = "เหนือ" | "กลาง" | "ใต้" | "อีสาน" | "ตะวันออก" | "ตะวันตก";
export type Elevation = "ราบ" | "สูง" | "ไม่แน่ใจ";
export type Experience = "มือใหม่" | "มีประสบการณ์";
export type WateringHabit = "รดน้ำได้สม่ำเสมอ" | "ไม่แน่นอน";
export type Goal = "กินเอง" | "ขายผลสด" | "ขายพรีเมียม" | "ทำต้นตอ";

export const REGIONS: { value: Region; label: string; note: string }[] = [
  { value: "เหนือ", label: "ภาคเหนือ", note: "มีพื้นที่สูงมาก" },
  { value: "กลาง", label: "ภาคกลาง", note: "ส่วนใหญ่เป็นที่ราบ" },
  { value: "ตะวันตก", label: "ภาคตะวันตก", note: "มีทั้งที่ราบและที่สูง" },
  { value: "อีสาน", label: "ภาคอีสาน", note: "ส่วนใหญ่เป็นที่ราบ" },
  { value: "ตะวันออก", label: "ภาคตะวันออก", note: "ส่วนใหญ่เป็นที่ราบ ร้อนชื้น" },
  { value: "ใต้", label: "ภาคใต้", note: "ร้อนชื้นตลอดปี" },
];

export const ELEVATIONS: { value: Elevation; label: string }[] = [
  { value: "ราบ", label: "ที่ราบ / ต่ำกว่า 700 เมตร" },
  { value: "สูง", label: "ที่สูงกว่า 700 เมตร" },
  { value: "ไม่แน่ใจ", label: "ไม่แน่ใจ" },
];

export const EXPERIENCES: { value: Experience; label: string }[] = [
  { value: "มือใหม่", label: "มือใหม่ ยังไม่เคยปลูก" },
  { value: "มีประสบการณ์", label: "เคยปลูกไม้ผลมาก่อน" },
];

export const WATERING_HABITS: { value: WateringHabit; label: string }[] = [
  { value: "รดน้ำได้สม่ำเสมอ", label: "รดน้ำได้สม่ำเสมอทุกวัน" },
  { value: "ไม่แน่นอน", label: "ไม่แน่นอน ไปสวนได้ไม่ทุกวัน" },
];

export const GOALS: { value: Goal; label: string }[] = [
  { value: "กินเอง", label: "ปลูกกินเองในครัวเรือน" },
  { value: "ขายผลสด", label: "ขายผลสดในตลาดทั่วไป" },
  { value: "ขายพรีเมียม", label: "ขายตลาดพรีเมียม / ร้านอาหาร" },
  { value: "ทำต้นตอ", label: "ทำต้นตอสำหรับทาบกิ่งภายหลัง" },
];

export interface MatchAnswers {
  region: Region | null;
  elevation: Elevation | null;
  experience: Experience | null;
  watering: WateringHabit | null;
  goal: Goal | null;
}

export const EMPTY_ANSWERS: MatchAnswers = {
  region: null,
  elevation: null,
  experience: null,
  watering: null,
  goal: null,
};

export interface MatchResult {
  variety: Variety;
  score: number; // 0-100
  verdict: "เหมาะมาก" | "เหมาะ" | "พอใช้";
  tone: string; // tailwind-ish color for the score/verdict/bar
  pros: string[];
  cons: string[];
}

function scoreElevation(userElevation: Elevation | null, varietyElevation?: Variety["elevation"]): number {
  if (!userElevation || userElevation === "ไม่แน่ใจ") return 30; // no info to penalize against
  if (!varietyElevation || varietyElevation === "ทุกพื้นที่") return 35;
  return varietyElevation === userElevation ? 35 : 8;
}

function scoreExperience(experience: Experience | null, difficultyLevel = 2): number {
  if (!experience || experience === "มีประสบการณ์") return 25;
  // มือใหม่: easier varieties (lower difficultyLevel) score higher
  return Math.round(((5 - difficultyLevel) / 4) * 25);
}

function scoreWatering(watering: WateringHabit | null, waterNeed: Variety["waterNeed"] = "ปานกลาง"): number {
  if (!watering || watering === "รดน้ำได้สม่ำเสมอ") return 20;
  if (waterNeed === "ต่ำ") return 20;
  if (waterNeed === "ปานกลาง") return 11;
  return 3;
}

function scoreGoal(goal: Goal | null, goals: string[] = []): number {
  if (!goal) return 14;
  return goals.includes(goal) ? 20 : 7;
}

export function matchVarieties(varieties: Variety[], answers: MatchAnswers): MatchResult[] {
  const results = varieties.map((variety) => {
    const elevationPts = scoreElevation(answers.elevation, variety.elevation);
    const experiencePts = scoreExperience(answers.experience, variety.difficultyLevel);
    const wateringPts = scoreWatering(answers.watering, variety.waterNeed);
    const goalPts = scoreGoal(answers.goal, variety.goals);
    const score = Math.min(100, elevationPts + experiencePts + wateringPts + goalPts);

    const pros: string[] = [];
    const cons: string[] = [];

    if (answers.elevation && answers.elevation !== "ไม่แน่ใจ") {
      if (elevationPts >= 30) {
        pros.push(
          variety.elevation === "ทุกพื้นที่" || !variety.elevation
            ? "ปลูกได้แทบทุกพื้นที่ ไม่จำกัดความสูง"
            : `เหมาะกับพื้นที่${variety.elevation === "สูง" ? "สูงกว่า 700 เมตร" : "ที่ราบ"} ที่คุณเลือก`
        );
      } else {
        cons.push(
          `ปกติต้องการพื้นที่${variety.elevation === "สูง" ? "สูงกว่า 700 เมตร" : "ที่ราบ"} ต่างจากที่คุณเลือก`
        );
      }
    }

    if (answers.experience === "มือใหม่") {
      if ((variety.difficultyLevel ?? 2) <= 2) pros.push("ดูแลง่าย เหมาะกับมือใหม่");
      else cons.push("ต้องการการดูแลค่อนข้างละเอียด อาจไม่เหมาะกับมือใหม่");
    }

    if (answers.watering === "ไม่แน่นอน") {
      if (variety.waterNeed === "ต่ำ") pros.push("ทนแล้งได้ดี ไม่ต้องรดน้ำทุกวัน");
      else if (variety.waterNeed === "สูง") cons.push("ต้องการน้ำสม่ำเสมอ เสี่ยงถ้ารดน้ำไม่คงที่");
    }

    if (answers.goal && variety.goals?.includes(answers.goal)) {
      pros.push(`ตรงกับเป้าหมาย "${answers.goal}" ของคุณ`);
    } else if (answers.goal) {
      cons.push(`ไม่ใช่ตัวเลือกหลักสำหรับเป้าหมาย "${answers.goal}" — ยังปลูกได้แต่มีตัวเลือกที่เหมาะกว่า`);
    }

    const verdict: MatchResult["verdict"] = score >= 78 ? "เหมาะมาก" : score >= 55 ? "เหมาะ" : "พอใช้";
    const tone = score >= 78 ? "#2D5F2E" : score >= 55 ? "#C9A227" : "#A8452A";

    return {
      variety,
      score,
      verdict,
      tone,
      pros: pros.slice(0, 3),
      cons: cons.slice(0, 2),
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function hasAnyAnswer(answers: MatchAnswers): boolean {
  return Object.values(answers).some((v) => v !== null);
}

export function countAnswered(answers: MatchAnswers): number {
  return Object.values(answers).filter((v) => v !== null).length;
}
