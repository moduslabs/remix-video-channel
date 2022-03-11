import { redirect } from "remix";

export async function loader() {
  return redirect("./app");
}
