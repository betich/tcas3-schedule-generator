import { TGroupedSubjects, TSubjectId, TSubjectObj } from "@types"
import { groupSubjects } from "@utils/groupSubjects"
import { toDateString } from "@utils/toDateString"
import classNames from "classnames"
import { FC } from "react"
import styles from "./schedule.module.scss"

interface IScheduleData {
  subjects: TSubjectId[]
}

const DayCard: FC<{ date: string; subjects: TSubjectObj[] }> = ({ date, subjects }) => {
  return (
    <div className={styles["day-card"]}>
      <div className={styles["day-header"]}>
        <span className={styles["text"]}>{toDateString(date)}</span>
      </div>
      <hr className={styles["divider"]} />
      <div className={styles["day-schedule-list"]}>
        {subjects.map((e, i) => {
          return (
            <div key={e.text} className={styles["schedule-text-container"]}>
              <span className={classNames(styles["time"], "font-number")}>
                {e.from}-{e.to}
              </span>
              <span className={styles["subject"]}>{e.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Schedule: FC<{ width: number; data: IScheduleData; className?: string }> = ({
  data,
  width = 2388,
  className,
}) => {
  const mappedSubjects: TGroupedSubjects = groupSubjects(data.subjects)

  return (
    <div
      style={{ ["--width" as string]: `${width}px`, height: width * 0.6984, width }}
      className={classNames(className, styles["page"])}
    >
      <div className={styles["credit-content"]}>
        <p className="font-light">Create your schedule now!</p>
        <p className="font-monospace">https://tcas-schedule.betich.me</p>
      </div>
      <div className={styles["body-content"]}>
        <div className={styles["heading-text"]}>
          <h2 className={styles["text"]}>ตารางสอบรอบ 3 TCAS DEK65</h2>
        </div>
        <div className={styles["day-card-list"]}>
          {Object.keys(mappedSubjects).map((date, i) => {
            return <DayCard key={date} date={date} subjects={mappedSubjects[date]} />
          })}
        </div>
      </div>
    </div>
  )
}
