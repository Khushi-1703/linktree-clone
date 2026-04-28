import clientPromise from "@/lib/mongodb";

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const handle = body?.handle?.trim().toLowerCase();
    const pic = body?.pic?.trim();
    const desc = body?.desc?.trim();

    const links =
      body?.links
        ?.filter((link) => link.linktext?.trim() && link.link?.trim())
        ?.map((link) => ({
          linktext: link.linktext.trim(),
          link: link.link.trim(),
        })) || [];

    // Validation
    if (!handle || !pic || !desc) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Handle, picture and description are required.",
        },
        { status: 400 },
      );
    }

    if (!links.length) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "At least one valid link is required.",
        },
        { status: 400 },
      );
    }

    const invalidLink = links.find((link) => !isValidUrl(link.link));

    if (invalidLink) {
      return Response.json(
        {
          success: false,
          error: true,
          message: `Invalid URL: ${invalidLink.link}`,
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const existingHandle = await collection.findOne({ handle });

    if (existingHandle) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "This Bittree already exists!",
        },
        { status: 409 },
      );
    }

    const result = await collection.insertOne({
      handle,
      pic,
      desc,
      links,
      createdAt: new Date(),
    });

    return Response.json(
      {
        success: true,
        error: false,
        message: "Your Bittree has been generated!",
        result: {
          insertedId: result.insertedId,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      {
        success: false,
        error: true,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
