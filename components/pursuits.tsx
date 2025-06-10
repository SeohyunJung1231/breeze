
"use client";

import { Headphones, MessageSquare, Heart, Users } from 'lucide-react';
import styles from './pursuits.module.css';
const pursuits = [
    {
        text: '파트간 음악을 서로 들으려 해요',
        Icon: Headphones,
        colorHex: '#115E59',
    },
    {
        text: '각자의 음악 생활을 응원해요!',
        Icon: Heart,
        colorHex: '#581C87',
    },
    {
        text: '음악 동료를 만날 수 있어요',
        Icon: Users,
        colorHex: '#7F1D1D',
    },
    {
        text: '서로 배려해요',
        Icon: MessageSquare,
        colorHex: '#78350F',
    },
];

export function PursuitsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    브리즈에서 추구하는 것
                </h2>

                <div className={styles.grid}>
                    {pursuits.map((item, index) => (
                        <div key={index} className={styles.card}>
                            {/* 상단 아이콘 영역 */}
                            {/* 3. 동적인 배경색은 inline style로 적용합니다. */}
                            <div className={styles.iconArea} style={{ backgroundColor: item.colorHex }}>
                                <item.Icon size={64} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                            </div>
                            {/* 하단 텍스트 영역 */}
                            <div className={styles.textArea}>
                                <h3 className={styles.cardTitle}>
                                    {item.text}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}