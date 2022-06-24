import { Schedule } from "@components/schedule"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SchedulePage: NextPage = () => {
  const { query } = useRouter()

  const { data } = query

  const parsedData = typeof data === "string" ? JSON.parse(data) : null

  return (
    <Schedule
      width={2388}
      data={{
        subjects: parsedData?.subjects ?? ["TGAT", "TPAT3"],
        theme: parsedData?.theme ?? "study",
        font: parsedData?.font ?? "normal",
        mode: parsedData?.mode ?? "light",
      }}
    />
  )
}

export default SchedulePage
