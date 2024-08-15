import { api } from "@/trpc/server";
import SingleItemPage from "./single-item-page";
import { getSession } from "@/lib";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { item_id: string };
}) {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  const user = await api.user.getByUsername({ username: session.username });

  if (!user) {
    return redirect("/login");
  }

  const numberId = Number(params.item_id);

  const item = await api.item.getOne({ id: numberId });

  if (!item) {
    return <div>Item not found</div>;
  }

  return <SingleItemPage username={user.username} item={item} />;
}
