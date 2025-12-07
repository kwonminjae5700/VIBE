import React from "react";

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex-1 bg-black text-white p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p>이 페이지는 아직 준비 중입니다.</p>
    </div>
  );
};
