import { SummaryType, TestCaseResponse } from "@/types";
import axiosInstance from "../axios";

export class CommonService {
  static async getSummary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post<SummaryType>(
      "/summary/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }

  static async getTestData(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post<TestCaseResponse>(
      "/test-case/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}