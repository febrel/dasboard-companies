import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json({ error: "fileUrl is required" }, { status: 400 });
    }

    const fileKey = fileUrl.split("/").pop();
    if (!fileKey) {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }

    const utapi = new UTApi();
    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[UPLOADTHING_DELETE]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
