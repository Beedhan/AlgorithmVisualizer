import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Algorithms = [
  {
    name: "Linked List",
    url: "linkedlist",
  },
  {
    name: "Doubly Linked List",
    url: "#",
  },
  {
    name: "Stack",
    url: "stack",
  },
  {
    name: "Queue",
    url: "queue",
  },
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center gap-4 flex-wrap p-48">
      {Algorithms.map((algorithm, index) => (
        <Link
          className={buttonVariants({ variant: "default" })}
          href={algorithm.url}
          key={index}
        >
          {algorithm.name}
        </Link>
      ))}
    </main>
  );
}
