// 03/12 => ศุกร์ที่ 12 มี.ค.

export const toDateString = (dateString: string) => {
  const [month, date] = dateString.split("/")
  //   const dateObj = new Date(`${date}/${month}/${new Date().getFullYear()}`)
  const dateObj = new Date(`${new Date().getFullYear()}-${month}-${date}T00:00:00+07:00`)

  const monthIdxToName = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ]

  const monthName = monthIdxToName[dateObj.getMonth()]
  const dayName = dateObj.toLocaleString("th-TH", { weekday: "long" }).replace("วัน", "")

  return `${dayName}ที่ ${dateObj.getDate()} ${monthName}`
}
