import { useQuery } from "react-query";
import { getChapter, getChapterQuestion } from "../api/getChapter";

export const GET_INSPECTION_CHAPTER_QUERY_KEY = "officer-inspection-chapter";
export const GET_INSPECTION_CHAPTER_QUESTION_QUERY_KEY = "officer-inspection-chapter-question";

export function useChapter() {
   return useQuery(GET_INSPECTION_CHAPTER_QUERY_KEY, getChapter);
}

export function useChapterQuestion() {
   return useQuery(GET_INSPECTION_CHAPTER_QUESTION_QUERY_KEY, getChapterQuestion);
}
