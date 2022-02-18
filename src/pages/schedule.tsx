import { Schedule } from "@components/schedule"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SchedulePage: NextPage = () => {
  const { query } = useRouter()

  const { data } = query

  const parsedData = JSON.parse(
    (data as string) ?? '{"subjects":["GAT","PAT1","PAT3"],"theme":"study","font":"normal"}'
  )

  return (
    <Schedule
      width={2388}
      data={{
        subjects: parsedData.subjects ?? ["GAT", "PAT1", "PAT3"],
        theme: parsedData.theme ?? "study",
        font: parsedData.font ?? "normal",
      }}
    />
  )
}

export default SchedulePage
