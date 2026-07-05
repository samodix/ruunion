import { redirect } from "next/navigation";

export default function AdminRedirectPage() {
  redirect("http://localhost/ruunion/wp-admin/");
}
