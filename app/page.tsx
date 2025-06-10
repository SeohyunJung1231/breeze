import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">우리 오케스트라에 오신 것을 환영합니다</h1>
        <p className="text-lg text-muted-foreground">
          음악에 대한 열정을 가진 새로운 단원을 모집합니다.
        </p>
        <Button asChild size="lg">
          <Link href="/apply">지금 지원하기</Link>
        </Button>
      </div>
    </main>
  );
}