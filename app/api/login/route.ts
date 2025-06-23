// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { email, password } = body;

//   if (!email || !password) {
//     return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
//   }

//   const user = await prisma.User.findUnique({
//     where: { email }
//   });

//   if (!user) {
//     return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
//   }

//   return new Response(JSON.stringify({ message: "Login successful", user: { id: user.id, email: user.email } }), { status: 200 });
// }
// app/api/login/route.ts
// app/api/login/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return success response (excluding password)
    return NextResponse.json(
      { 
        message: "Login successful", 
        user: { 
          id: user.id, 
          email: user.email,
          name: user.name 
        } 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}