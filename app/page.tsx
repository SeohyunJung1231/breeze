"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const naviBlue = '#1A2A44';     // Logo navy blue color

export default function HomePage() {
  return (
    <div className={`bg-[${naviBlue}] min-h-screen`}>
      <main className="text-white py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Section (Text) */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              음악에 진심을,
              <br />
              앙상블에 집중을
            </h1>
            <p className="text-lg text-gray-300">
              Breeze Ensemble은 음악을 사랑하는 아마추어 오케스트라로,
              서로의 소리에 귀 기울이며 진지한 탐구와 부드러운 열정으로 함께 성장합니다.
            </p>
            <Button asChild size="lg">
              <Link href="/apply">함께 연주하기</Link>
            </Button>
          </div>

          {/* Right Section (Logo - Full Width) */}
          <div className="relative h-auto md:h-96 w-full">
            <Image
              src="/logo.png"
              alt="Breeze Ensemble Logo"
              fill
              style={{ objectFit: 'contain' }}
              className="dark:invert"
            />
          </div>
        </div>
      </main>
    </div>
  );
}