'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import AnsiToHtml from 'ansi-to-html';
import Confetti from 'react-confetti';

export const Terminal = () => {
  const [buffer, setBuffer] = useState('');
  const [testsQueued, setTestsQueued] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const ansiConvert = useMemo(() => new AnsiToHtml(), []);
  const [exitCode, setExitCode] = useState<number | null>(null);

  const handleClick = async () => {
    setTestsQueued(true);
    setBuffer('Test run has been queued... please wait <br/>');

    // Ensure that there is no current Eventsource before begining
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const res = await fetch('/api/add-job', { method: 'POST' });
    const { jobId } = await res.json();

    const events = new EventSource(`/api/test-stream?jobId=${jobId}`);
    eventSourceRef.current = events;
    setExitCode(null);

    events.onmessage = (event) => {
      if (event.data.length > 0) {
        const parsedAnsi = ansiConvert.toHtml(event.data);
        setBuffer((prev) => prev + parsedAnsi + '<br/>');
      }
    };

    events.addEventListener('end', (event) => {
      // Parse exit code as integer if possible
      const code = parseInt(event.data.slice(-2, -1), 10);
      setExitCode(isNaN(code) ? null : code);
      events.close();
      setTestsQueued(false);
    });

    events.onerror = () => {
      events.close();
      setTestsQueued(false);
    };
  };

  const bufferRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when buffer updates
  useEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
    }
  }, [buffer]);

  return (
    <>
      {exitCode === 0 && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
          data-testid="confetti-canvas"
          className="w-full"
        />
      )}
      <div className="fixed inset-0 flex flex-col justify-end items-center p-10">
        {/* Always render the buffer div, but control its visibility and height */}
        <div
          ref={bufferRef}
          role="log"
          className={`transition-all duration-500 ease-in-out overflow-scroll text-left border-2 border-slate-700 w-full max-w-4xl bg-slate-700/30 rounded-lg ${
            buffer.length > 0
              ? 'h-[20vh] p-4 mb-5 opacity-100'
              : 'h-0 p-0 mb-0 opacity-0'
          }`}
          aria-label="Console output from test run"
          dangerouslySetInnerHTML={{ __html: buffer }}
        />

        <Button
          onClick={handleClick}
          disabled={testsQueued}
          className="h-15 w-full max-w-md transition-all duration-500 ease-in-out"
        >
          Click Here To Test My Website!
        </Button>
      </div>
    </>
  );
};
