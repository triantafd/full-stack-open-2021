import diaries from "../../data/diaries";
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../types";

/* import diaryData from '../../data/diariesJSON.json'; */
/* const diaries: Array<DiaryEntry> = diaryData; */
/* const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; */
/* const getEntries = (): Array<DiaryEntry> => {
  return diaries;
}; */

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
  addDiary,
};
