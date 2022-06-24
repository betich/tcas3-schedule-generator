import { IScheduleData, TGroupedSubjects, TSubjectId, TSubjectObj, TUnis } from "@types"
import { groupSubjects } from "@utils/groupSubjects"
import { toDateString } from "@utils/toDateString"
import classNames from "classnames"
import { FC, useEffect, useState } from "react"
import styles from "./schedule.module.scss"
import Image from "next/image"
import { uniColor, unis } from "@utils/unis"

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

export const Schedule: FC<{
  width: number
  data: IScheduleData
  className?: string
}> = ({ data, width = 2388, className }) => {
  const mappedSubjects = groupSubjects(data.subjects)

  return (
    <div
      style={{
        ["--width" as string]: `${width}px`,
        ["--font-size" as string]: data.font === "large" ? 110 : 165,
        ["--container-width" as string]: data.font === "large" ? 1.8 : 2.4,
        ["--card-width" as string]: data.font === "large" ? 3.715 : 5,
        ["--gap" as string]: data.font === "large" ? -10 : 1000,
        ["--text-align" as string]: Object.keys(mappedSubjects).length === 1 ? "left" : "right",
        ["--uni-color" as string]: uniColor[data.theme as TUnis],
        height: width * 0.6984,
        width,
      }}
      data-theme={data.mode}
      className={classNames(className, styles["page"])}
    >
      {data?.theme === "balls" && (
        <>
          <div className={styles["ball-1"]} />
          <div className={styles["ball-2"]} />
          <div className={styles["ball-3"]} />
        </>
      )}
      {data?.theme === "study" && (
        <div
          style={{
            height: width * 0.6984,
            width,
          }}
          className="absolute top-0 left-0"
        >
          <div className="reltive">
            <Image alt="ตารางสอบ TCAS รอบ 3 DEK66" priority={true} src="/assets/studybg.png" layout="fill" />
          </div>
        </div>
      )}
      {unis.includes(data?.theme) && (
        <>
          <div className={classNames(styles["uni-img"], styles["topleft"])}>
            <Image alt={data.theme} priority={true} src={`/assets/uni/${data.theme}.png`} layout="fill" />
          </div>
          <div className={classNames(styles["uni-img"], styles["topmid"])}>
            <Image alt={data.theme} priority={true} src={`/assets/uni/${data.theme}.png`} layout="fill" />
          </div>
          <div className={classNames(styles["uni-img"], styles["topright"])}>
            <Image alt={data.theme} priority={true} src={`/assets/uni/${data.theme}.png`} layout="fill" />
          </div>

          <div className={classNames(styles["uni-img"], styles["bottomleft"])}>
            <Image alt={data.theme} priority={true} src={`/assets/uni/${data.theme}.png`} layout="fill" />
          </div>
          <div className={classNames(styles["uni-img"], styles["bottommid"])}>
            <Image alt={data.theme} priority={true} src={`/assets/uni/${data.theme}.png`} layout="fill" />
          </div>
          <div className={classNames(styles["uni-img"], styles["bottomright"])}>
            <Image alt={data.theme} priority={true} src={`/assets/uni/${data.theme}.png`} layout="fill" />
          </div>

          {/* <div className={styles["tcaster"]}>
            <Image alt="TCASter Logo" priority={true} src={`/assets/tcaster.png`} layout="fill" />
          </div> */}
        </>
      )}
      {data.mode !== "uni" && (
        <div className={styles["credit-content"]}>
          <p className="font-light">Create your schedule now!</p>
          <p className="font-monospace">https://tcas.betich.me</p>
        </div>
      )}
      <div className={styles["body-content"]}>
        <div className={styles["heading-text"]}>
          <h2 className={styles["text"]}>ตารางสอบรอบ 3 TCAS DEK66</h2>
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
