import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  // If the handle is already claimed, you cannot create the bittree
  const item = await collection.findOne({ handle: handle });
  if (!item) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen bg-purple-500 justify-center items-start py-10 px-4">
      {item && (
        <div className="photo w-full max-w-xl flex flex-col items-center gap-4">
          <img
            className="rounded-full object-cover border-3 border-purple-300 shadow-2xl w-52 h-52"
            src={item?.pic}
            alt={item?.handle}
          />
          <span className="font-bold text-xl">@{item?.handle}</span>
          <span className="desc text-white/90 max-w-md text-center">{item?.desc}</span>
          <div className="links w-full mt-4 text-black">
            {item?.links?.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white text-purple-700 font-medium py-4 px-4 w-full rounded-xl shadow-md text-center mb-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
                    {item?.linktext}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
