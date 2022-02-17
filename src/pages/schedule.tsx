import { Schedule } from "@components/schedule"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SchedulePage: NextPage = () => {
  const { query } = useRouter()

  const { data } = query

  return (
    <Schedule
      width={2388}
      data={{
        subjects: JSON.parse((data as string) ?? '["GAT", "PAT1", "PAT3"]'),
      }}
    />
  )
}

export default SchedulePage
