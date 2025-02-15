'use client'
import { Button } from "@/components/ui/button";
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button className="p-4 m-6" onClick={() => setCount(count + 1)}>Become Gay</Button>
      <p className="p-4 m-6">Gayness: {count}</p>
    </>
  );
}
