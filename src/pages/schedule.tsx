import { Schedule } from "@components/schedule"
import { NextPage } from "next"

const SchedulePage: NextPage = () => {
  return (
    <Schedule
      width={2388}
      data={{
        subjects: [
          "GAT",
          "PAT1",
          "PAT3",
          "PAT2",
          "PAT5",
          "PAT7",
          "PAT4",
          "PAT6",
          "GEN09",
          "GEN29",
          "GEN39",
          "GEN49",
          "GEN59",
          "GEN69",
          "GEN19",
          "MED1",
          "MED2",
          "MED3",
        ],
      }}
    />
  )
}

export default SchedulePage
