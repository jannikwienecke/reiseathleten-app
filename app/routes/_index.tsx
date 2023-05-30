import { redirect } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "Reiseathleten App" }];

export const loader = () => {
  return redirect("/vacation");
};

export default function Index() {
  return null;
}
