import { NYCSchool } from "../models/NYCSchool";
import { SATInfo } from "../models/SATInfo";

export function getSchoolsInfo(): Promise<NYCSchool[]> {
  return fetch("https://data.cityofnewyork.us/resource/s3k6-pzi2.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      console.error("Error fetching schools information:", error);
      throw error;
    });
}

export function getSATInfo(): Promise<SATInfo[]> {
  return fetch(
    "https://data.cityofnewyork.us/resource/f9bf-2cp4.json?$query=SELECT%20%60dbn%60%20as%20__select_alias__%2C%20%60school_name%60%20as%20__select_alias1__%2C%20%60num_of_sat_test_takers%60%20as%20__select_alias2__%2C%20%60sat_critical_reading_avg_score%60%20as%20__select_alias3__%2C%20%60sat_math_avg_score%60%20as%20__select_alias4__%2C%20%60sat_writing_avg_score%60%20as%20__select_alias5__%20",
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching SAT information:", error);
      throw error;
    });
}
