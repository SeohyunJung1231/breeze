"use client";

import { useRef, useState, useEffect, UIEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const youtubeVideos = [
  {
    id: 1,
    title: 'Gounod : Petite Symphonie',
    youtubeVideoId: 'IvahAeJb3JU&t=321s',
  },
  {
    id: 2,
    title: 'Smetana : Vltava (Die Moldau)',
    youtubeVideoId: '5LuPE9PrzR8',
  },
  {
    id: 3,
    title: '(Encore) Tchaikovsky : Danse hongroise',
    youtubeVideoId: '0M4USR5_T-s',
  },
];

export default function HomePage() {


  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrows = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isScrollable = container.scrollWidth > container.clientWidth;
      setShowLeftArrow(isScrollable && container.scrollLeft > 0);
      setShowRightArrow(isScrollable && container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleOnScroll = (event: UIEvent<HTMLDivElement>) => {
    checkArrows();
  };

  return (
    <div className={`bg-[#1A2A44] min-h-screen`}>
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


      <section className="py-20 md:py-24">
        <div className="mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            연주 영상 다시보기
          </h2>
          <div className="relative">

            {showLeftArrow && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 border-none rounded-full"
                onClick={() => handleScroll('left')}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </Button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={handleOnScroll}
              className="flex space-x-8 overflow-x-auto pb-4 no-scrollbar"
            >
              {youtubeVideos.map((video) => (
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`}
                  key={video.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative rounded-lg shadow-lg w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0"
                >
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={`https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`}
                      alt={`${video.title} a thumbnail`}
                      width={500}
                      height={375}
                      className="object-cover w-full h-full aspect-video transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                      <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {showRightArrow && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 border-none rounded-full"
                onClick={() => handleScroll('right')}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}