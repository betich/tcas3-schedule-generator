import type { NextApiRequest, NextApiResponse } from "next"
import screenshot from "@lib/screenshot"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { data, width, height },
  } = req

  const _width = isNaN(+width) ? 2388 : +width
  const _height = isNaN(+height) ? 1668 : +height

  const file = await screenshot(
    `http${(req.headers.host as string).includes("localhost" ? "" : "s")}://${
      req.headers.host
    }/schedule?data=${data}&width=${_width}&height=${_height}`,
    _width,
    _height
  )

  res.setHeader("Content-Type", `image/jpeg`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}
