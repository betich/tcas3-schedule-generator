import Head from "next/head"
import { FC } from "react"

export const MetaData: FC = () => {
  return (
    <Head>
      <title>TCAS Exam Schedule Generator</title>
      <meta name="description" content="ระบบสร้างตารางสอบ TCAS รอบ 3 ปีการศึกษา 2566" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tcas-schedule.betich.me/" />
      <meta property="og:title" content="TCAS Exam Schedule Generator" />
      <meta property="og:description" content="ระบบสร้างตารางสอบ TCAS รอบ 3 ปีการศึกษา 2566" />
      <meta property="og:image" content="/preview.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://tcas-schedule.betich.me/" />
      <meta property="twitter:title" content="TCAS Exam Schedule Generator" />
      <meta property="twitter:description" content="ระบบสร้างตารางสอบ TCAS รอบ 3 ปีการศึกษา 2566" />
      <meta property="twitter:image" content="/preview.jpg" />

      <meta name="author" content="betich" />
      <meta
        name="keywords"
        content="betich, thee, tcas betich, ระบบเลือกตารางสอบ tcas, เลือกตารางสอบ, GAT, PAT1, PAT2, PAT3, PAT4, PAT5, PAT6, PAT7, betich, tcas, ตารางสอบ tcas, มหาวิทยาลัย, dek65, tcas dek65, สอบเข้ามหาวิทยาลัย 2565, ตาราง tcas65, ตารางสอบ tcas65, dek66, tcas dek66, สอบเข้ามหาวิทยาลัย 2566, ตาราง tcas66, ตารางสอบ tcas66, dek67, tcas dek67, สอบเข้ามหาวิทยาลัย 2567, ตาราง tcas67, ตารางสอบ tcas67, ชีววิทยา, ฟิสิกส์, เคมี, ภาษาอังกฤษ, คณิตศาสตร์, A-Level, TGAT, TPAT, สังคมศึกษา, ภาษาไทย"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-LHCKJQ6Q82"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
			  window.dataLayer = window.dataLayer || [];
			  function gtag(){dataLayer.push(arguments);}
			  gtag('js', new Date());
			  gtag('config', 'G-LHCKJQ6Q82', {
				page_path: window.location.pathname,
			  });
			`,
        }}
      />
    </Head>
  )
}
