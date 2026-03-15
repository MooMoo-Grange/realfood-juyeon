import { NextResponse } from "next/server";

const SUPABASE_URL = "https://rksbvlhpfycttfdzxrof.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc2J2bGhwZnljdHRmZHp4cm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNzc4NjYsImV4cCI6MjA4Njk1Mzg2Nn0.xy2lz_RUEFfQoT5gfc_ubaUQYdFnyb48NNYn9b2oiYA";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "유효한 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/realfood_subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      }
    );

    if (res.status === 409 || res.status === 23505) {
      return NextResponse.json(
        { error: "이미 구독 중인 이메일입니다." },
        { status: 409 }
      );
    }

    if (!res.ok) {
      const body = await res.text();
      // Supabase unique violation
      if (body.includes("duplicate") || body.includes("23505")) {
        return NextResponse.json(
          { error: "이미 구독 중인 이메일입니다." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "구독 처리 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
