// frontend/app/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  //   console.log("req : ", await req.json());
  console.log(process.env.URL);
  const data = await req.json();

  const res = await fetch(`${process.env.SERVER_URL}/api/user`, {
    method: "POST",
    headers: {
      // header 꼭 넣어줘야함. 안넣어주면 제대로 전송 안됨.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // console.log("res : ", await res.json());
  const result = await res.json();
  if (result._id) {
    return NextResponse.json({ result });
  } else {
    // return NextResponse.json({ Error });
    // return new NextResponse(result, { status: 400 });
    return NextResponse.json({ ...result }, { status: 400 });
  }

  return NextResponse.json({});
};
