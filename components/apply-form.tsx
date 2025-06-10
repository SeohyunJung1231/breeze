"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage"; // 2단계에서 만든 훅
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

// 폼 데이터의 초기 상태
const INITIAL_DATA = {
    name: "",
    instrument: "",
    motivation: "",
    history: "",
};

export function ApplyForm() {
    const [step, setStep] = useState(1);
    // 'application-draft'라는 키로 localStorage에 폼 데이터를 저장합니다.
    const [formData, setFormData] = useLocalStorage("application-draft", INITIAL_DATA);

    const totalSteps = 4; // 이름/악기 -> 동기 -> 이력 -> 확인

    function updateFields(fields: Partial<typeof INITIAL_DATA>) {
        setFormData((prev) => ({ ...prev, ...fields }));
    }

    function nextStep() {
        if (step < totalSteps) setStep(step + 1);
    }

    function prevStep() {
        if (step > 1) setStep(step - 1);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // 최종 제출 로직 (예: 서버로 데이터 전송)
        alert("지원서가 제출되었습니다!");
        console.log(formData);
        // 제출 후 캐시 삭제
        setFormData(INITIAL_DATA);
        setStep(1);
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>오케스트라 단원 지원</CardTitle>
                <CardDescription>총 {totalSteps}단계 중 {step}단계 진행 중입니다.</CardDescription>
                <Progress value={(step / totalSteps) * 100} className="mt-2" />
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {step === 1 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">기본 정보</h3>
                            <div>
                                <Label htmlFor="name">이름</Label>
                                <Input id="name" value={formData.name} onChange={e => updateFields({ name: e.target.value })} required />
                            </div>
                            <div>
                                <Label htmlFor="instrument">악기</Label>
                                <Input id="instrument" value={formData.instrument} onChange={e => updateFields({ instrument: e.target.value })} required />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <Label htmlFor="motivation">지원 동기</Label>
                            <Textarea id="motivation" value={formData.motivation} onChange={e => updateFields({ motivation: e.target.value })} required rows={5} />
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <Label htmlFor="history">주요 연주 이력</Label>
                            <Textarea id="history" value={formData.history} onChange={e => updateFields({ history: e.target.value })} required rows={8} placeholder="예: 2024년 예술의전당 협연..." />
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">최종 확인</h3>
                            <p><strong>이름:</strong> {formData.name}</p>
                            <p><strong>악기:</strong> {formData.instrument}</p>
                            <p><strong>지원 동기:</strong> {formData.motivation}</p>
                            <p><strong>연주 이력:</strong> {formData.history}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 && (
                        <Button type="button" variant="ghost" onClick={prevStep}>이전</Button>
                    )}
                    {step < totalSteps && (
                        <Button type="button" onClick={nextStep} className="ml-auto">다음</Button>
                    )}
                    {step === totalSteps && (
                        <Button type="submit" className="ml-auto">제출하기</Button>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}