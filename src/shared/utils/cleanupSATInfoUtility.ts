/*
 This is a utility used to cleanup the object by transforming object keys returned from the API call 
 into keys that can be understood and used within this application
 */

import { SATInfo } from "../models/SATInfo";

export function cleanupSATInfoUtility(data: any[]) {
  const newData: SATInfo[] = [];

  try {
    data.map((info: Record<string, unknown>, index: number) => {
      const newDataObject: SATInfo = {
        DBN: "",
        SCHOOL_NAME: "",
        NUM_OF_SAT_TEST_TAKERS: "",
        SAT_CRITICAL_READING_AVG_SCORE: "",
        SAT_MATH_AVG_SCORE: "",
        SAT_WRITING_AVG_SCORE: "",
      };
      // the raw data contains unusable column names
      // this utility aims to correct that issue by
      // replacing the vague columns names with the
      // appropriate ones
      newDataObject["DBN"] = info.__select_alias__ as string;
      newDataObject["SCHOOL_NAME"] = info.__select_alias1__ as string;
      newDataObject["NUM_OF_SAT_TEST_TAKERS"] =
        info.__select_alias2__ as string;
      newDataObject["SAT_CRITICAL_READING_AVG_SCORE"] =
        info.__select_alias3__ as string;
      newDataObject["SAT_MATH_AVG_SCORE"] = info.__select_alias4__ as string;
      newDataObject["SAT_WRITING_AVG_SCORE"] = info.__select_alias5__ as string;
      newData.push(newDataObject);
    });
  } catch (e) {
    throw new Error("Error: Invalid data" + e);
  }

  return newData;
}
